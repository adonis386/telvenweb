import { FaCheck } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import type { InternetDevice } from '../types/InternetDevice'

const InternetDevicesSection = () => {
  const [internetDevices, setInternetDevices] = useState<InternetDevice[]>([])

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/internet-devices')
        const data = await response.json()
        setInternetDevices(data)
      } catch (error) {
        console.error('Error fetching internet devices:', error)
      }
    }

    fetchDevices()
  }, [])

  return (
    <section className="relative pt-16 pb-24 bg-white rounded-t-[50px] mt-[-20px]">
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Equipos de Internet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra gama de dispositivos para una conexión perfecta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {internetDevices.map((device) => (
            <div 
              key={device.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={device.image}
                  alt={device.name}
                  className="w-full h-48 object-contain p-4"
                />
                <span className="absolute top-2 right-2 bg-[#28A745] text-white px-3 py-1 rounded-full text-sm">
                  {device.tag}
                </span>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-[#28A745] font-semibold mb-2">
                  {device.category}
                </div>
                <h3 className="text-xl font-bold mb-2">{device.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{device.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {device.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <FaCheck className="text-[#28A745] mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

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
      </div>
    </section>
  )
}

export default InternetDevicesSection