import { FaShoppingCart, FaArrowRight, FaWifi } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Phone } from '../types/Phone'
import type { InternetDevice } from '../types/InternetDevice'
import type { CubittProduct } from '../types/CubittProduct'

const ProductSection = () => {
  const [phones, setPhones] = useState<Phone[]>([])
  const [internetDevices, setInternetDevices] = useState<InternetDevice[]>([])
  const [cubittProducts, setCubittProducts] = useState<CubittProduct[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch phones
        const phonesResponse = await fetch('http://localhost:5000/api/phones')
        const phonesData = await phonesResponse.json()
        setPhones(phonesData)

        // Fetch internet devices
        const devicesResponse = await fetch('http://localhost:5000/api/internet-devices')
        const devicesData = await devicesResponse.json()
        setInternetDevices(devicesData)

        // Fetch Cubitt products
        const cubittResponse = await fetch('http://localhost:5000/api/cubitt-products')
        const cubittData = await cubittResponse.json()
        setCubittProducts(cubittData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="relative pt-16 pb-24 bg-gray-50 rounded-t-[20px] mt-[-20px] z-10">
      {/* Teléfonos */}
      <div className="container mx-auto px-4 pt-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nuestros Smartphones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de los últimos smartphones con la mejor tecnología y al mejor precio.
          </p>
        </div>

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

        <div className="text-center mt-12">
          <Link 
            to="/phones"
            className="inline-flex items-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver más teléfonos
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Equipos de Internet */}
      <div className="container mx-auto px-4 pt-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Equipos de Internet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conectividad de alta velocidad para tu hogar y negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internetDevices.map((device) => (
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {device.name}
                </h3>
                <p className="text-gray-600 mb-4">{device.description}</p>
                <ul className="space-y-2 mb-4">
                  {device.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <FaWifi className="text-[#28A745] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#28A745]">
                    ${device.price}
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

        <div className="text-center mt-12">
          <Link 
            to="/internet-devices"
            className="inline-flex items-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver más equipos
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Productos Cubitt */}
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

        <div className="text-center mt-12">
          <Link 
            to="/cubitt"
            className="inline-flex items-center gap-2 bg-[#28A745] hover:bg-[#218838] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver más productos
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductSection 