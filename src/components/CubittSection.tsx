// import { FaShoppingCart } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import type { CubittProduct } from '../types/CubittProduct'

const CubittSection = () => {
  const [cubittProducts, setCubittProducts] = useState<CubittProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cubitt-products')
        const data = await response.json()
        setCubittProducts(data)
      } catch (error) {
        console.error('Error fetching Cubitt products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="relative pt-16 pb-24 bg-gray-50 rounded-t-[50px] mt-[-20px]">
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Cubitt Lifestyle
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra línea exclusiva de productos Cubitt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cubittProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
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
      </div>
    </section>
  )
}

export default CubittSection 