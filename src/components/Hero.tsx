import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Importa todas las imágenes que contengan "Home" en su nombre
const images = import.meta.glob('../assets/*Home*.webp', { eager: true })
const imageUrls = Object.values(images).map((image: any) => image.default)

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageUrls.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[60vh]">
      {/* Slides */}
      <div className="relative h-full">
        {imageUrls.map((url, index) => (
          <div
            key={url}
            className={`absolute w-full h-full transition-all duration-[2000ms] transform ${
              index === currentSlide 
                ? 'opacity-100 scale-105' 
                : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-[2000ms]"
            />
            {/* Overlay oscuro gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        <FaChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
      >
        <FaChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero 