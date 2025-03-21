import { useState, useEffect } from 'react'
import type { CubittProduct } from '../types/CubittProduct'
import PageHero from '../components/PageHero'

const CubittPage = () => {
  const [products, setProducts] = useState<CubittProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cubitt-products')
        if (!response.ok) throw new Error('Error al cargar los productos')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        setError('Error al cargar los productos')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <PageHero image="/src/assets/Home (6).webp" />
      <section className="relative pt-16 pb-24 bg-gray-100 rounded-t-[20px] mt-[-20px]">
        <div className="container mx-auto px-4 pt-8">
          {loading && <div className="text-center py-8">Cargando...</div>}
          {error && <div className="text-center py-8 text-red-600">{error}</div>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain p-4"
                    />
                    <span className="absolute top-2 right-2 bg-[#28A745] text-white px-2 py-1 rounded-full text-sm">
                      {product.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#28A745]">${product.price}</span>
                      <button className="bg-[#28A745] hover:bg-[#218838] text-white px-3 py-1 rounded-lg text-sm transition-colors">
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CubittPage 