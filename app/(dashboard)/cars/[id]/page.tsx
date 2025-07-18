"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, X, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cars } from '@/lib/data'

const statusOptions = ["En preparación", "Disponibles", "Reservados", "Vendidos"]
const brandOptions = ["Audi", "BMW", "Ford", "Tesla", "Toyota"]
const etiqOptions = ["0", "ECO", "B", "C"]
const portalOptions = ["Auto1", "Coches.net", "AutoScout24", "Wallapop", "Facebook"]

export default function EditVehiclePage() {
  const router = useRouter()
  const params = useParams()
  const carId = params.id as string

  const [formData, setFormData] = useState({
    vehicle: "",
    brand: "",
    year: "",
    price: "",
    kms: "",
    plate: "",
    status: "En preparación",
    etiq: "0",
    days: "",
    portals: {} as Record<string, string>, // Portal name as key, URL as value
    image: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Find the car by ID
    const car = cars.find(c => c.id === parseInt(carId))
    
    if (car) {
      // Convert array of portals to object format for compatibility
      const portalsObject: Record<string, string> = {}
      car.portals.forEach(portal => {
        portalsObject[portal] = "" // Initialize with empty URL - in real app you'd load the actual URLs
      })
      
      setFormData({
        vehicle: car.vehicle,
        brand: car.brand,
        year: car.year.toString(),
        price: car.price.toString(),
        kms: car.kms.toString(),
        plate: car.plate,
        status: car.status,
        etiq: car.etiq,
        days: car.days.toString(),
        portals: portalsObject,
        image: car.image || ""
      })
    } else {
      setNotFound(true)
    }
    
    setLoading(false)
  }, [carId])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handlePortalToggle = (portal: string) => {
    setFormData(prev => ({
      ...prev,
      portals: prev.portals[portal] 
        ? (() => {
            const newPortals = { ...prev.portals }
            delete newPortals[portal]
            return newPortals
          })()
        : { ...prev.portals, [portal]: "" }
    }))
  }

  const handlePortalUrlChange = (portal: string, url: string) => {
    setFormData(prev => ({
      ...prev,
      portals: { ...prev.portals, [portal]: url }
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.vehicle.trim()) newErrors.vehicle = "El nombre del vehículo es obligatorio"
    if (!formData.brand.trim()) newErrors.brand = "La marca es obligatoria"
    if (!formData.year.trim()) newErrors.year = "El año es obligatorio"
    if (!formData.price.trim()) newErrors.price = "El precio es obligatorio"
    if (!formData.kms.trim()) newErrors.kms = "Los kilómetros son obligatorios"
    if (!formData.plate.trim()) newErrors.plate = "La matrícula es obligatoria"

    // Validate numeric fields
    if (formData.year && (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear() + 1)) {
      newErrors.year = "Año inválido"
    }
    if (formData.price && (isNaN(Number(formData.price)) || Number(formData.price) <= 0)) {
      newErrors.price = "Precio inválido"
    }
    if (formData.kms && (isNaN(Number(formData.kms)) || Number(formData.kms) < 0)) {
      newErrors.kms = "Kilómetros inválidos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // TODO: Here you would normally update in your backend/database
    console.log("Updating vehicle:", formData)
    
    // Simulate saving and redirect
    alert("Vehículo actualizado correctamente!")
    router.push("/cars")
  }

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.")) {
      // TODO: Here you would normally delete from your backend/database
      console.log("Deleting vehicle:", carId)
      alert("Vehículo eliminado correctamente!")
      router.push("/cars")
    }
  }

  const handleCancel = () => {
    router.push("/cars")
  }

  if (loading) {
    return (
      <div className="p-6 bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando vehículo...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="p-6 bg-brand-light min-h-screen">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vehículo no encontrado</h3>
          <p className="text-gray-500 mb-4">El vehículo que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={() => router.push("/cars")}
            className="inline-flex items-center px-4 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a vehículos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-brand-light min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/cars")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </button>
          <h1 className="text-2xl font-bold text-brand-navy">Editar Vehículo</h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehículo *
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => handleInputChange("vehicle", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.vehicle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ej: Audi A4 2.0 TDI"
                />
                {errors.vehicle && <p className="text-red-500 text-sm mt-1">{errors.vehicle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Marca *
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => handleInputChange("brand", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Selecciona una marca</option>
                  {brandOptions.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.year ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="2023"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (€) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="25000"
                  min="0"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kilómetros *
                </label>
                <input
                  type="number"
                  value={formData.kms}
                  onChange={(e) => handleInputChange("kms", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.kms ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="50000"
                  min="0"
                />
                {errors.kms && <p className="text-red-500 text-sm mt-1">{errors.kms}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matrícula *
                </label>
                <input
                  type="text"
                  value={formData.plate}
                  onChange={(e) => handleInputChange("plate", e.target.value.toUpperCase())}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.plate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1234ABC"
                />
                {errors.plate && <p className="text-red-500 text-sm mt-1">{errors.plate}</p>}
              </div>
            </div>
          </div>

          {/* Status and Classification */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado y Clasificación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiqueta Ambiental
                </label>
                <select
                  value={formData.etiq}
                  onChange={(e) => handleInputChange("etiq", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {etiqOptions.map(etiq => (
                    <option key={etiq} value={etiq}>{etiq}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Días en Stock
                </label>
                <input
                  type="number"
                  value={formData.days}
                  onChange={(e) => handleInputChange("days", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Portals */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portales de Venta</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portalOptions.map(portal => (
                <div key={portal} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.portals[portal] !== undefined}
                        onChange={() => handlePortalToggle(portal)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">{portal}</span>
                    </label>
                  </div>
                  
                  {formData.portals[portal] !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL del anuncio
                      </label>
                      <input
                        type="url"
                        value={formData.portals[portal] || ''}
                        onChange={(e) => handlePortalUrlChange(portal, e.target.value)}
                        placeholder="https://ejemplo.com/anuncio"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {Object.keys(formData.portals).length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Portales seleccionados:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(formData.portals).map(([portal, url]) => (
                    <Badge key={portal} variant="secondary" size="sm">
                      {portal} {url && '✓'}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Imagen</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la imagen (opcional)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-48 h-32 object-cover rounded-xl bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-navy/90 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}