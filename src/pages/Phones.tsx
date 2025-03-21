import { FaShoppingCart, FaStar } from 'react-icons/fa'
import type { Phone } from '../types/Phone'
import heroImage from '../assets/Home (4).webp'

const phones: Phone[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 999.99,
    image: '/src/assets/Home (1).webp',
    description: '256GB, Titanio Natural',
    tag: 'Nuevo',
    rating: 5.0,
    specs: [
      '6.1" Super Retina XDR OLED',
      'Chip A17 Pro',
      'Cámara triple 48MP',
      'Titanio aeroespacial'
    ]
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199.99,
    image: '/src/assets/Home (2).webp',
    description: '512GB, Titanium Gray',
    tag: 'Destacado',
    rating: 4.8,
    specs: [
      '6.8" Dynamic AMOLED 2X',
      'Snapdragon 8 Gen 3',
      'Cámara 200MP',
      'S Pen incluido'
    ]
  },
  // Añade más teléfonos aquí...
]

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i}
          className={`${
            i < rating 
              ? 'text-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        ({rating})
      </span>
    </div>
  )
}

const Phones = () => {
  return (
    <>
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src={heroImage}
          alt="Phones Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          
        </div>
      </div>

      <div className="relative pt-16 bg-gray-50 rounded-t-[20px] mt-[-20px] z-20">
        <div className="container mx-auto px-4 pt-8">
          {/* Filtros y ordenamiento (puedes expandir esta funcionalidad después) */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Todos los modelos
            </h2>
            <select className="border rounded-lg px-4 py-2">
              <option>Más recientes</option>
              <option>Menor precio</option>
              <option>Mayor precio</option>
            </select>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  
                  {/* Especificaciones */}
                  <ul className="space-y-2 mb-4">
                    {phone.specs.map((spec, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {spec}
                      </li>
                    ))}
                  </ul>

                  {/* Rating */}
                  <RatingStars rating={phone.rating} />

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#28A745]">
                      ${phone.price}
                    </span>
                    <button className="bg-[#28A745] hover:bg-[#218838] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                      <FaShoppingCart />
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Phones 