import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import type { InternetDevice } from '../types/InternetDevice'
import PageHero from '../components/PageHero'

const InternetDevicesPage = () => {
  const [devices, setDevices] = useState<InternetDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/internet-devices')
        if (!response.ok) throw new Error('Error al cargar los dispositivos')
        const data = await response.json()
        setDevices(data)
      } catch (error) {
        setError('Error al cargar los productos')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  return (
    <>
      <PageHero image="/src/assets/Home (5).webp" />
      <section className="relative pt-16 pb-24 bg-gray-100 rounded-t-[20px] mt-[-20px]">
        <div className="container mx-auto px-4 pt-8">
          {loading && <div className="text-center py-8">Cargando...</div>}
          {error && <div className="text-center py-8 text-red-600">{error}</div>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devices.map((device) => (
                <div 
                  key={device.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={device.image}
                      alt={device.name}
                      className="w-full h-64 object-contain p-4"
                    />
                    <span className="absolute top-4 right-4 bg-[#28A745] text-white px-3 py-1 rounded-full text-sm">
                      {device.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="text-sm text-[#28A745] font-semibold mb-2">
                      {device.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{device.name}</h3>
                    <p className="text-gray-600 mb-4">{device.description}</p>
                    
                    {device.features && (
                      <ul className="space-y-2 mb-6">
                        {device.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <FaCheck className="text-[#28A745] mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#28A745]">
                        ${device.price}
                      </span>
                      <button className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-2 rounded-lg transition-colors">
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

export default InternetDevicesPage 