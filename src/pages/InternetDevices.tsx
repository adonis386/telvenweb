import heroImage from '../assets/Home (5).webp'

const InternetDevices = () => {
  return (
    <>
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src={heroImage}
          alt="Internet Devices Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          
        </div>
      </div>

      <section className="relative pt-16 bg-gray-50 rounded-t-[20px] mt-[-20px]">
        <div className="container mx-auto px-4 pt-8">
          {/* ... contenido expandido de equipos de internet ... */}
        </div>
      </section>
    </>
  )
}

export default InternetDevices 