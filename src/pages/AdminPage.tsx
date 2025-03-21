import { useState, useEffect } from 'react'
import { FaPlus, FaWifi, FaMobile, FaBox, FaUpload, FaEdit, FaTrash } from 'react-icons/fa'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('phones')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const [phoneData, setPhoneData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    tag: '',
    specs: [''],
    rating: ''
  })

  const [internetDeviceData, setInternetDeviceData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    tag: '',
    features: ['']
  })

  const [cubittProductData, setCubittProductData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    tag: ''
  })

  // Nuevos estados para la tabla
  const [phones, setPhones] = useState([])
  const [internetDevices, setInternetDevices] = useState([])
  const [cubittProducts, setCubittProducts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  // Mover fetchData fuera del useEffect
  const fetchData = async () => {
    try {
      if (activeTab === 'phones') {
        const response = await fetch('http://localhost:5000/api/phones')
        const data = await response.json()
        setPhones(data)
      } else if (activeTab === 'internet-devices') {
        const response = await fetch('http://localhost:5000/api/internet-devices')
        const data = await response.json()
        setInternetDevices(data)
      } else if (activeTab === 'cubitt-products') {
        const response = await fetch('http://localhost:5000/api/cubitt-products')
        const data = await response.json()
        setCubittProducts(data)
      }
    } catch (error) {
      setError('Error al cargar los datos')
    }
  }

  // Usar fetchData en useEffect
  useEffect(() => {
    fetchData()
  }, [activeTab]) // Agregar fetchData a las dependencias si es necesario

  const handleSubmit = async (type: string) => {
    try {
      let data
      let endpoint = `http://localhost:5000/api/admin/${type}`
      let method = 'POST'

      // Si estamos editando, cambiar el endpoint y método
      if (editingId !== null) {
        endpoint = `${endpoint}/${editingId}`
        method = 'PUT'
      }

      switch (type) {
        case 'phones':
          data = {
            ...phoneData,
            specs: phoneData.specs.filter(spec => spec.trim() !== '')
          }
          break
        case 'internet-devices':
          data = {
            ...internetDeviceData,
            features: internetDeviceData.features.filter(feature => feature.trim() !== '')
          }
          break
        case 'cubitt-products':
          data = cubittProductData
          break
        default:
          return
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Error al guardar los datos')

      setMessage(editingId ? 'Producto actualizado exitosamente' : 'Producto agregado exitosamente')
      setError('')
      setIsEditing(false)
      setEditingId(null)

      // Limpiar el formulario y recargar datos
      resetForm(type)
      fetchData() // Asegúrate de tener esta función para recargar los datos
    } catch (err) {
      setError('Error al guardar el producto')
      setMessage('')
    }
  }

  const addField = (type: 'specs' | 'features') => {
    if (type === 'specs') {
      setPhoneData(prev => ({
        ...prev,
        specs: [...prev.specs, '']
      }))
    } else {
      setInternetDeviceData(prev => ({
        ...prev,
        features: [...prev.features, '']
      }))
    }
  }

  // Función para manejar la subida de archivos
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setData: Function) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Error al subir la imagen')

      const data = await response.json()
      setData((prev: any) => ({...prev, image: data.url}))
      setMessage('Imagen subida exitosamente')
    } catch (error) {
      setError('Error al subir la imagen')
      console.error('Error:', error)
    } finally {
      setUploading(false)
    }
  }

  // Componente para el selector de archivos
  const FileUploadField = ({ value, setData }: { 
    value: string; 
    setData: (data: any) => void 
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Imagen del producto
      </label>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#28A745] hover:text-[#218838]">
                  <span>Subir imagen</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setData)}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF hasta 10MB
              </p>
            </div>
          </div>
        </div>
        {value && (
          <div className="h-20 w-20 relative">
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover rounded"
            />
          </div>
        )}
      </div>
      {uploading && (
        <div className="text-sm text-gray-500">
          Subiendo imagen...
        </div>
      )}
    </div>
  )

  // Función para eliminar
  const handleDelete = async (id: number, type: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/${type}/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          setMessage('Producto eliminado exitosamente')
          // Recargar datos
          const updatedResponse = await fetch(`http://localhost:5000/api/${type}`)
          const updatedData = await updatedResponse.json()
          if (type === 'phones') setPhones(updatedData)
          else if (type === 'internet-devices') setInternetDevices(updatedData)
          else if (type === 'cubitt-products') setCubittProducts(updatedData)
        }
      } catch (error) {
        setError('Error al eliminar el producto')
      }
    }
  }

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingId(null)
    resetForm(activeTab)
  }

  // Agregar esta función después de los estados
  const resetForm = (type: string) => {
    switch (type) {
      case 'phones':
        setPhoneData({
          name: '',
          price: '',
          image: '',
          description: '',
          tag: '',
          specs: [''],
          rating: ''
        })
        break
      case 'internet-devices':
        setInternetDeviceData({
          name: '',
          price: '',
          image: '',
          description: '',
          category: '',
          tag: '',
          features: ['']
        })
        break
      case 'cubitt-products':
        setCubittProductData({
          name: '',
          price: '',
          image: '',
          description: '',
          tag: ''
        })
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header verde */}
      <header className="bg-[#28A745] text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              activeTab === 'phones' ? 'bg-[#28A745] text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('phones')}
          >
            <FaMobile className="inline mr-2" />
            Teléfonos
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              activeTab === 'internet-devices' ? 'bg-[#28A745] text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('internet-devices')}
          >
            <FaWifi className="inline mr-2" />
            Equipos de Internet
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-lg ${
              activeTab === 'cubitt-products' ? 'bg-[#28A745] text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('cubitt-products')}
          >
            <FaBox className="inline mr-2" />
            Productos Cubitt
          </button>
        </div>

        {/* Mensajes */}
        {message && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabla de productos */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Tabla para teléfonos */}
              {activeTab === 'phones' && phones.map((phone: any) => (
                <tr key={phone.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={phone.image} alt={phone.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{phone.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${phone.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {phone.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setEditingId(phone.id)
                        setPhoneData(phone)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit className="inline" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(phone.id, 'phones')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {/* Tabla para dispositivos de internet */}
              {activeTab === 'internet-devices' && internetDevices.map((device: any) => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={device.image} alt={device.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{device.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${device.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {device.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setEditingId(device.id)
                        setInternetDeviceData(device)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit className="inline" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(device.id, 'internet-devices')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {/* Tabla para productos Cubitt */}
              {activeTab === 'cubitt-products' && cubittProducts.map((product: any) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setEditingId(product.id)
                        setCubittProductData(product)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit className="inline" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, 'cubitt-products')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="inline" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulario existente */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancelar edición
              </button>
            )}
          </div>
          {activeTab === 'phones' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('phones'); }}>
              <div className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Nombre del teléfono"
                  className="border p-2 rounded"
                  value={phoneData.name}
                  onChange={(e) => setPhoneData({...phoneData, name: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  className="border p-2 rounded"
                  value={phoneData.price}
                  onChange={(e) => setPhoneData({...phoneData, price: e.target.value})}
                />
                <FileUploadField
                  value={phoneData.image}
                  setData={setPhoneData}
                />
                <textarea
                  placeholder="Descripción"
                  className="border p-2 rounded"
                  value={phoneData.description}
                  onChange={(e) => setPhoneData({...phoneData, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Tag (ej: Nuevo, Destacado)"
                  className="border p-2 rounded"
                  value={phoneData.tag}
                  onChange={(e) => setPhoneData({...phoneData, tag: e.target.value})}
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Rating (0-5)"
                  className="border p-2 rounded"
                  value={phoneData.rating}
                  onChange={(e) => setPhoneData({...phoneData, rating: e.target.value})}
                />
                
                {/* Specs dinámicos */}
                <div>
                  <label className="block mb-2">Especificaciones:</label>
                  {phoneData.specs.map((spec, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Especificación ${index + 1}`}
                      className="border p-2 rounded mb-2 w-full"
                      value={spec}
                      onChange={(e) => {
                        const newSpecs = [...phoneData.specs]
                        newSpecs[index] = e.target.value
                        setPhoneData({...phoneData, specs: newSpecs})
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addField('specs')}
                    className="text-[#28A745] hover:text-[#218838]"
                  >
                    <FaPlus className="inline mr-1" />
                    Añadir especificación
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#28A745] text-white py-2 px-4 rounded hover:bg-[#218838]"
                >
                  Guardar Teléfono
                </button>
              </div>
            </form>
          )}

          {activeTab === 'internet-devices' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('internet-devices'); }}>
              <div className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Nombre del dispositivo"
                  className="border p-2 rounded"
                  value={internetDeviceData.name}
                  onChange={(e) => setInternetDeviceData({...internetDeviceData, name: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  className="border p-2 rounded"
                  value={internetDeviceData.price}
                  onChange={(e) => setInternetDeviceData({...internetDeviceData, price: e.target.value})}
                />
                <FileUploadField
                  value={internetDeviceData.image}
                  setData={setInternetDeviceData}
                />
                <textarea
                  placeholder="Descripción"
                  className="border p-2 rounded"
                  value={internetDeviceData.description}
                  onChange={(e) => setInternetDeviceData({...internetDeviceData, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  className="border p-2 rounded"
                  value={internetDeviceData.category}
                  onChange={(e) => setInternetDeviceData({...internetDeviceData, category: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="border p-2 rounded"
                  value={internetDeviceData.tag}
                  onChange={(e) => setInternetDeviceData({...internetDeviceData, tag: e.target.value})}
                />
                
                {/* Features dinámicos */}
                <div>
                  <label className="block mb-2">Características:</label>
                  {internetDeviceData.features.map((feature, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Característica ${index + 1}`}
                      className="border p-2 rounded mb-2 w-full"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...internetDeviceData.features]
                        newFeatures[index] = e.target.value
                        setInternetDeviceData({...internetDeviceData, features: newFeatures})
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addField('features')}
                    className="text-[#28A745] hover:text-[#218838]"
                  >
                    <FaPlus className="inline mr-1" />
                    Añadir característica
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#28A745] text-white py-2 px-4 rounded hover:bg-[#218838]"
                >
                  Guardar Dispositivo
                </button>
              </div>
            </form>
          )}

          {activeTab === 'cubitt-products' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('cubitt-products'); }}>
              <div className="grid grid-cols-1 gap-6">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="border p-2 rounded"
                  value={cubittProductData.name}
                  onChange={(e) => setCubittProductData({...cubittProductData, name: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  className="border p-2 rounded"
                  value={cubittProductData.price}
                  onChange={(e) => setCubittProductData({...cubittProductData, price: e.target.value})}
                />
                <FileUploadField
                  value={cubittProductData.image}
                  setData={setCubittProductData}
                />
                <textarea
                  placeholder="Descripción"
                  className="border p-2 rounded"
                  value={cubittProductData.description}
                  onChange={(e) => setCubittProductData({...cubittProductData, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Tag"
                  className="border p-2 rounded"
                  value={cubittProductData.tag}
                  onChange={(e) => setCubittProductData({...cubittProductData, tag: e.target.value})}
                />
                <button
                  type="submit"
                  className="bg-[#28A745] text-white py-2 px-4 rounded hover:bg-[#218838]"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage 