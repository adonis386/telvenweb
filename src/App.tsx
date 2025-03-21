import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import Footer from './components/Footer'
import PhonesPage from './pages/PhonesPage'
import InternetDevicesPage from './pages/InternetDevicesPage'
import CubittPage from './pages/CubittPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductSection />
              </>
            } />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/internet-devices" element={<InternetDevicesPage />} />
            <Route path="/cubitt" element={<CubittPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
