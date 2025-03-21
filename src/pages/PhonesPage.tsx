import { useState, useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import type { Phone } from '../types/Phone'
import PageHero from '../components/PageHero'

const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/phones')
        if (!response.ok) throw new Error('Error al cargar los teléfonos')
        const data = await response.json()
        setPhones(data)
      } catch (error) {
        setError('Error al cargar los productos')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhones()
  }, [])

  return (
    <>
      <PageHero image="/src/assets/Home (4).webp" />
      <section className="relative pt-16 pb-24 bg-gray-100 rounded-t-[20px] mt-[-20px]">
        <div className="container mx-auto px-4 pt-8">
          {loading && <div className="text-center py-8">Cargando...</div>}
          {error && <div className="text-center py-8 text-red-600">{error}</div>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {phones.map((phone) => (
                <div 
                  key={phone.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-[#28A745] text-white px-3 py-1 rounded-full text-sm">
                      {phone.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {phone.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{phone.description}</p>
                    
                    {phone.specs && (
                      <ul className="space-y-2 mb-4">
                        {phone.specs.map((spec, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">•</span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#28A745]">
                        ${phone.price}
                      </span>
                      <button className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        <FaShoppingCart />
                        Añadir
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

export default PhonesPage 