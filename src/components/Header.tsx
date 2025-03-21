import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.webp'
import { FaUser, FaSearch } from 'react-icons/fa'

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#28A745] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-16 w-auto brightness-0 invert"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/phones" 
              className={`text-white hover:text-white/80 transition-colors border-b-2 ${
                location.pathname === '/phones' 
                  ? 'border-white' 
                  : 'border-transparent hover:border-white/50'
              }`}
            >
              Teléfonos
            </Link>
            <Link 
              to="/internet-devices" 
              className={`text-white hover:text-white/80 transition-colors border-b-2 ${
                location.pathname === '/internet-devices' 
                  ? 'border-white' 
                  : 'border-transparent hover:border-white/50'
              }`}
            >
              Equipos de Internet
            </Link>
            <Link 
              to="/cubitt" 
              className={`text-white hover:text-white/80 transition-colors border-b-2 ${
                location.pathname === '/cubitt' 
                  ? 'border-white' 
                  : 'border-transparent hover:border-white/50'
              }`}
            >
              Cubitt
            </Link>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white hover:text-white/80 transition-colors"
                aria-label="Buscar"
              >
                <FaSearch className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-72">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>
            <button 
              className="p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Usuario"
            >
              <FaUser className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 