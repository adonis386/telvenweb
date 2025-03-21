import { FaWifi, FaCheck } from 'react-icons/fa'
import type { InternetPlan } from '../types/InternetPlan'

const internetPlans: InternetPlan[] = [
  {
    id: 1,
    name: 'Plan Básico',
    speed: '100 Mbps',
    price: 29.99,
    image: '/src/assets/internet-basic.webp',
    features: [
      'Velocidad simétrica',
      'Router WiFi 6',
      'Instalación gratuita',
      'Soporte 24/7'
    ]
  },
  {
    id: 2,
    name: 'Plan Pro',
    speed: '300 Mbps',
    price: 49.99,
    image: '/src/assets/internet-pro.webp',
    features: [
      'Velocidad simétrica',
      'Router WiFi 6',
      'IP fija',
      'Instalación gratuita',
      'Soporte prioritario 24/7'
    ]
  },
  {
    id: 3,
    name: 'Plan Gaming',
    speed: '500 Mbps',
    price: 69.99,
    image: '/src/assets/internet-gaming.webp',
    features: [
      'Velocidad simétrica',
      'Router Gaming WiFi 6E',
      'IP fija',
      'Instalación gratuita',
      'Soporte VIP 24/7'
    ]
  }
]

const InternetSection = () => {
  return (
    <section className="relative pt-16 pb-24 bg-white rounded-t-[50px] mt-[-20px]">
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Planes de Internet
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conectividad de alta velocidad para tu hogar y negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internetPlans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <FaWifi className="text-[#28A745] text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-center text-[#28A745] mb-4">
                  {plan.speed}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-[#28A745] mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#28A745] mb-4">
                    ${plan.price}/mes
                  </p>
                  <button className="bg-[#28A745] hover:bg-[#218838] text-white px-8 py-3 rounded-lg transition-colors w-full">
                    Contratar
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

export default InternetSection 