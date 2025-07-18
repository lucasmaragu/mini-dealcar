"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, X, Upload, Eye, EyeOff, Check, AlertCircle, Info, Car, Euro, Calendar, Gauge, Hash, Tag, Globe, ImageIcon, Settings, FileText, Building, Plus, Minus, Star } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useCars } from "@/hooks/useCars"

const statusOptions = [
  { value: "En preparación", label: "En preparación", color: "bg-blue-100 text-blue-800" },
  { value: "Disponibles", label: "Disponibles", color: "bg-green-100 text-green-800" },
  { value: "Reservados", label: "Reservados", color: "bg-yellow-100 text-yellow-800" },
  { value: "Vendidos", label: "Vendidos", color: "bg-red-100 text-red-800" }
]

const brandOptions = ["Audi", "BMW", "Ford", "Tesla", "Toyota", "Mercedes", "Volkswagen", "Seat", "Renault"]

const fuelOptions = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "Gas", "Flex"]

const transmissionOptions = ["Manual", "Automático", "CVT", "Semi-automático"]

const etiqOptions = [
  { value: "0", label: "0 - Cero emisiones", color: "bg-blue-100 text-blue-800" },
  { value: "ECO", label: "ECO - Híbrido/Gas", color: "bg-green-100 text-green-800" },
  { value: "B", label: "B - Gasolina", color: "bg-yellow-100 text-yellow-800" },
  { value: "C", label: "C - Diésel", color: "bg-orange-100 text-orange-800" }
]

const portalOptions = [
  { name: "Auto1", icon: "🚗", description: "Portal profesional de vehículos" },
  { name: "Coches.net", icon: "🔍", description: "Líder en venta de coches usados" },
  { name: "AutoScout24", icon: "🌍", description: "Portal europeo de automóviles" },
  { name: "Wallapop", icon: "📱", description: "Marketplace de segunda mano" },
  { name: "Facebook", icon: "📘", description: "Redes sociales y marketplace" }
]

interface FormData {
  vehicle: string
  brand: string
  model: string
  year: string
  price: string
  originalPrice: string
  kms: string
  plate: string
  status: string
  etiq: string
  days: string
  color: string
  fuel: string
  transmission: string
  doors: string
  seats: string
  power: string
  consumption: string
  emissions: string
  description: string
  features: string[]
  location: string
  dealer: string
  history: string
  maintenance: string
  portalUrls: {
    cochesNet: string
    autocasion: string
    motor: string
    milanuncios: string
  }
  portals: Record<string, string>
  images: string[]
}

export default function AddVehiclePage() {
  const router = useRouter()
  const { addCar } = useCars()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    vehicle: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    originalPrice: "",
    kms: "",
    plate: "",
    status: "En preparación",
    etiq: "0",
    days: "",
    color: "",
    fuel: "",
    transmission: "",
    doors: "4",
    seats: "5",
    power: "",
    consumption: "",
    emissions: "",
    description: "",
    features: [],
    location: "",
    dealer: "",
    history: "",
    maintenance: "",
    portalUrls: {
      cochesNet: "",
      autocasion: "",
      motor: "",
      milanuncios: ""
    },
    portals: {},
    images: [""]
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  const steps = [
    { id: 1, title: "Información Básica", icon: Car },
    { id: 2, title: "Especificaciones Técnicas", icon: Settings },
    { id: 3, title: "Estado y Detalles", icon: Tag },
    { id: 4, title: "Descripción y Características", icon: FileText },
    { id: 5, title: "Portales de Venta", icon: Globe },
    { id: 6, title: "Concesionario y Ubicación", icon: Building },
    { id: 7, title: "Imágenes y Revisión", icon: ImageIcon }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const updatePortalUrl = (portal: keyof FormData['portalUrls'], value: string) => {
    setFormData(prev => ({
      ...prev,
      portalUrls: { ...prev.portalUrls, [portal]: value }
    }))
  }

  const handleFeatureAdd = (feature: string) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }))
    }
  }

  const handleFeatureRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
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

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
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
    }
    
    if (step === 2) {
      if (!formData.fuel.trim()) newErrors.fuel = "El tipo de combustible es obligatorio"
      if (!formData.transmission.trim()) newErrors.transmission = "La transmisión es obligatoria"
      if (!formData.color.trim()) newErrors.color = "El color es obligatorio"
    }

    if (step === 4) {
      if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    }

    if (step === 6) {
      if (!formData.dealer.trim()) newErrors.dealer = "El nombre del concesionario es obligatorio"
      if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar que todos los pasos obligatorios estén completos
    if (!validateStep(1) || !validateStep(2) || !validateStep(4) || !validateStep(6)) {
      // Ir al primer paso con errores
      for (let step = 1; step <= 7; step++) {
        if (!validateStep(step)) {
          setCurrentStep(step)
          return
        }
      }
    }

    setIsSubmitting(true)
    
    try {
      // Crear el objeto del vehículo con la nueva estructura
      const newCar = {
        id: Date.now().toString(),
        vehicle: formData.vehicle,
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
        kms: parseInt(formData.kms),
        plate: formData.plate,
        status: formData.status,
        etiq: formData.etiq,
        days: formData.days ? parseInt(formData.days) : null,
        color: formData.color,
        fuel: formData.fuel,
        transmission: formData.transmission,
        doors: parseInt(formData.doors),
        seats: parseInt(formData.seats),
        power: formData.power,
        consumption: formData.consumption,
        emissions: formData.emissions,
        description: formData.description,
        features: formData.features,
        images: formData.images.filter(img => img.trim() !== ''),
        portalUrls: formData.portalUrls,
        location: formData.location,
        dealer: formData.dealer,
        history: formData.history,
        maintenance: formData.maintenance
      }
      
      // Guardar el vehículo usando el hook
      await addCar(newCar)
      
      // Mostrar éxito y redirigir
      alert("Vehículo añadido correctamente!")
      router.push("/cars")
    } catch (error) {
      console.error("Error saving vehicle:", error)
      alert("Error al guardar el vehículo. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    const hasData = Object.values(formData).some(value => {
      if (typeof value === 'string') {
        return value.trim() !== "" && value !== "En preparación" && value !== "0"
      } else if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length > 0
      }
      return false
    })
    
    if (hasData) {
      if (confirm("¿Estás seguro de que quieres cancelar? Se perderán todos los cambios.")) {
        router.push("/cars")
      }
    } else {
      router.push("/cars")
    }
  }

  const getStepProgress = () => (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl  px-6 py-4">
          <div className="flex items-center  justify-between">
             <button
               
                onClick={() => router.push("/cars")}
                className="text-gray-600 flex hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </button>
            <div className="flex items-center space-x-4">
             
              <div>
                <h1 className="text-2xl font-bold text-brand-navy">Añadir Nuevo Vehículo</h1>
                <p className="text-sm text-gray-600">Paso {currentStep} de {steps.length}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-navy h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getStepProgress()}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(getStepProgress())}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white border-b  border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-brand-navy text-white" 
                      : isCompleted
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="font-medium">{step.title}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl text-gray-800  mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl  shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
                    <p className="text-sm text-gray-600">Datos principales del vehículo</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vehicle Name */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Car className="w-4 h-4" />
                    <span>Nombre del Vehículo *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.vehicle}
                    onChange={(e) => handleInputChange("vehicle", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.vehicle 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="Ej: Audi A4 2.0 TDI Quattro S-Line"
                  />
                  {errors.vehicle && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.vehicle}</span>
                    </div>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>Marca *</span>
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.brand 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                  >
                    <option value="">Selecciona una marca</option>
                    {brandOptions.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {errors.brand && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.brand}</span>
                    </div>
                  )}
                </div>

                {/* Model */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Car className="w-4 h-4" />
                    <span>Modelo</span>
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="Ej: A4, X3, Focus..."
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>Año *</span>
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.year 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="2023"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                  {errors.year && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.year}</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Euro className="w-4 h-4" />
                    <span>Precio Actual (€) *</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.price 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="25000"
                    min="0"
                  />
                  {errors.price && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.price}</span>
                    </div>
                  )}
                </div>

                {/* Original Price */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Euro className="w-4 h-4" />
                    <span>Precio Original (€)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="30000 (opcional)"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Si el vehículo ha tenido una rebaja</p>
                </div>

                {/* Kilometers */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Gauge className="w-4 h-4" />
                    <span>Kilómetros *</span>
                  </label>
                  <input
                    type="number"
                    value={formData.kms}
                    onChange={(e) => handleInputChange("kms", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.kms 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="50000"
                    min="0"
                  />
                  {errors.kms && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.kms}</span>
                    </div>
                  )}
                </div>

                {/* License Plate */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Hash className="w-4 h-4" />
                    <span>Matrícula *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.plate}
                    onChange={(e) => handleInputChange("plate", e.target.value.toUpperCase())}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.plate 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="1234ABC"
                  />
                  {errors.plate && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.plate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Technical Specifications */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Especificaciones Técnicas</h2>
                    <p className="text-sm text-gray-600">Detalles técnicos del vehículo</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Color */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>Color *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.color 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="Ej: Gris Nardo, Negro Zafiro..."
                  />
                  {errors.color && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.color}</span>
                    </div>
                  )}
                </div>

                {/* Fuel */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Settings className="w-4 h-4" />
                    <span>Combustible *</span>
                  </label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => handleInputChange("fuel", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.fuel 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                  >
                    <option value="">Selecciona combustible</option>
                    {fuelOptions.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                  {errors.fuel && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.fuel}</span>
                    </div>
                  )}
                </div>

                {/* Transmission */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Settings className="w-4 h-4" />
                    <span>Transmisión *</span>
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => handleInputChange("transmission", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.transmission 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                  >
                    <option value="">Selecciona transmisión</option>
                    {transmissionOptions.map(transmission => (
                      <option key={transmission} value={transmission}>{transmission}</option>
                    ))}
                  </select>
                  {errors.transmission && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.transmission}</span>
                    </div>
                  )}
                </div>

                {/* Doors */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Car className="w-4 h-4" />
                    <span>Puertas</span>
                  </label>
                  <select
                    value={formData.doors}
                    onChange={(e) => handleInputChange("doors", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  >
                    <option value="2">2 puertas</option>
                    <option value="3">3 puertas</option>
                    <option value="4">4 puertas</option>
                    <option value="5">5 puertas</option>
                  </select>
                </div>

                {/* Seats */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Car className="w-4 h-4" />
                    <span>Plazas</span>
                  </label>
                  <select
                    value={formData.seats}
                    onChange={(e) => handleInputChange("seats", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  >
                    <option value="2">2 plazas</option>
                    <option value="4">4 plazas</option>
                    <option value="5">5 plazas</option>
                    <option value="7">7 plazas</option>
                    <option value="8">8 plazas</option>
                  </select>
                </div>

                {/* Power */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Settings className="w-4 h-4" />
                    <span>Potencia</span>
                  </label>
                  <input
                    type="text"
                    value={formData.power}
                    onChange={(e) => handleInputChange("power", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="Ej: 190 CV, 351 CV..."
                  />
                </div>

                {/* Consumption */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Gauge className="w-4 h-4" />
                    <span>Consumo</span>
                  </label>
                  <input
                    type="text"
                    value={formData.consumption}
                    onChange={(e) => handleInputChange("consumption", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="Ej: 4.8 L/100km, 14.3 kWh/100km..."
                  />
                </div>

                {/* Emissions */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Settings className="w-4 h-4" />
                    <span>Emisiones</span>
                  </label>
                  <input
                    type="text"
                    value={formData.emissions}
                    onChange={(e) => handleInputChange("emissions", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="Ej: 126 g/km CO2, 0 g/km CO2..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Status and Classification */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Estado y Clasificación</h2>
                    <p className="text-sm text-gray-600">Información sobre el estado y características del vehículo</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Estado del Vehículo
                  </label>
                  <div className="space-y-3">
                    {statusOptions.map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={formData.status === option.value}
                          onChange={(e) => handleInputChange("status", e.target.value)}
                          className="w-4 h-4 text-brand-navy focus:ring-brand-navy border-gray-300"
                        />
                        <Badge className={option.color}>{option.label}</Badge>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Environmental Label */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Etiqueta Ambiental
                  </label>
                  <div className="space-y-3">
                    {etiqOptions.map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="etiq"
                          value={option.value}
                          checked={formData.etiq === option.value}
                          onChange={(e) => handleInputChange("etiq", e.target.value)}
                          className="w-4 h-4 text-brand-navy focus:ring-brand-navy border-gray-300"
                        />
                        <div>
                          <Badge className={option.color}>{option.value}</Badge>
                          <p className="text-xs text-gray-500 mt-1">{option.label}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Days in Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Días en Stock
                  </label>
                  <input
                    type="number"
                    value={formData.days}
                    onChange={(e) => handleInputChange("days", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                    placeholder="0"
                    min="0"
                  />
                  <div className="flex items-center space-x-2 mt-2 text-gray-500">
                    <Info className="w-4 h-4" />
                    <span className="text-xs">Se calculará automáticamente si se deja vacío</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Description and Features */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Descripción y Características</h2>
                    <p className="text-sm text-gray-600">Información detallada del vehículo</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Description */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <FileText className="w-4 h-4" />
                    <span>Descripción del Vehículo *</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors h-32 resize-none ${
                      errors.description 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-brand-navy"
                    }`}
                    placeholder="Describe el estado del vehículo, historial, características especiales, etc..."
                  />
                  {errors.description && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.description}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Check className="w-4 h-4" />
                    <span>Características y Equipamiento</span>
                  </label>
                  
                  {/* Add Feature Input */}
                  <div className="flex space-x-3 mb-4">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleFeatureAdd(newFeature)
                          setNewFeature("")
                        }
                      }}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      placeholder="Ej: Sistema de navegación GPS, Asientos de cuero..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleFeatureAdd(newFeature)
                        setNewFeature("")
                      }}
                      className="bg-brand-navy text-white px-6 py-3 rounded-xl hover:bg-brand-navy/90 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Añadir</span>
                    </button>
                  </div>

                  {/* Features List */}
                  {formData.features.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-gray-900">{feature}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleFeatureRemove(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.features.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No se han añadido características aún</p>
                      <p className="text-sm">Añade elementos que destaquen del vehículo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Portals */}
          {currentStep === 5 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Portales de Venta</h2>
                    <p className="text-sm text-gray-600">URLs donde se publicará el vehículo</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Coches.net
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.coches.net/..."
                    value={formData.portalUrls.cochesNet}
                    onChange={(e) => updatePortalUrl('cochesNet', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Autocasión
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.autocasion.com/..."
                    value={formData.portalUrls.autocasion}
                    onChange={(e) => updatePortalUrl('autocasion', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Motor.es
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.motor.es/..."
                    value={formData.portalUrls.motor}
                    onChange={(e) => updatePortalUrl('motor', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Milanuncios
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.milanuncios.com/..."
                    value={formData.portalUrls.milanuncios}
                    onChange={(e) => updatePortalUrl('milanuncios', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Sales Portals */}
          {currentStep === 6 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Portales de Venta</h2>
                    <p className="text-sm text-gray-600">Selecciona dónde quieres publicar este vehículo</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {portalOptions.map(portal => (
                  <div 
                    key={portal.name} 
                    className={`border-2 rounded-xl p-6 transition-all ${
                      formData.portals[portal.name] !== undefined
                        ? "border-brand-navy bg-brand-blue/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={() => handlePortalToggle(portal.name)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            formData.portals[portal.name] !== undefined
                              ? "border-brand-navy bg-brand-navy"
                              : "border-gray-300 bg-white hover:border-brand-navy"
                          }`}
                        >
                          {formData.portals[portal.name] !== undefined && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{portal.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{portal.name}</h3>
                            <p className="text-sm text-gray-600">{portal.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      {formData.portals[portal.name] !== undefined && (
                        <Badge className="bg-green-100 text-green-800">
                          Seleccionado
                        </Badge>
                      )}
                    </div>

                    {formData.portals[portal.name] !== undefined && (
                      <div className="mt-4 pl-10">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL del anuncio en {portal.name}
                        </label>
                        <input
                          type="url"
                          value={formData.portals[portal.name] || ""}
                          onChange={(e) => handlePortalUrlChange(portal.name, e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                          placeholder={`https://${portal.name.toLowerCase().replace(/\s+/g, '')}.com/anuncio-vehiculo`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {Object.keys(formData.portals).length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-4">
                    📊 Resumen de portales seleccionados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(formData.portals).map(([portal, url]) => (
                      <div key={portal} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="font-medium text-blue-800">{portal}</span>
                        <span className="text-sm text-blue-600 truncate max-w-32 ml-2">
                          {url || "URL pendiente"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Portals */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Coches.net
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.coches.net/..."
                    value={formData.portalUrls.cochesNet}
                    onChange={(e) => updatePortalUrl('cochesNet', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Autocasión
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.autocasion.com/..."
                    value={formData.portalUrls.autocasion}
                    onChange={(e) => updatePortalUrl('autocasion', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Motor.es
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.motor.es/..."
                    value={formData.portalUrls.motor}
                    onChange={(e) => updatePortalUrl('motor', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Milanuncios
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.milanuncios.com/..."
                    value={formData.portalUrls.milanuncios}
                    onChange={(e) => updatePortalUrl('milanuncios', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Dealer & Location */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Concesionario
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre del concesionario"
                    value={formData.dealer}
                    onChange={(e) => setFormData({...formData, dealer: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad, País"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Historial del Vehículo
                  </label>
                  <textarea
                    placeholder="Historial, propietarios anteriores, accidentes, etc..."
                    value={formData.history}
                    onChange={(e) => setFormData({...formData, history: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mantenimiento
                  </label>
                  <textarea
                    placeholder="Información sobre mantenimiento, revisiones, etc..."
                    value={formData.maintenance}
                    onChange={(e) => setFormData({...formData, maintenance: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Images and Review */}
          {currentStep === 7 && (
            <div className="space-y-8">
              {/* Image Upload */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Imagen del Vehículo</h2>
                      <p className="text-sm text-gray-600">Añade una imagen para mostrar el vehículo</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Imágenes del vehículo
                    </label>
                    <div className="space-y-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => {
                              const newImages = [...formData.images];
                              newImages[index] = e.target.value;
                              setFormData({...formData, images: newImages});
                            }}
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                            placeholder="https://ejemplo.com/imagen-vehiculo.jpg"
                          />
                          {formData.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = formData.images.filter((_, i) => i !== index);
                                setFormData({...formData, images: newImages});
                              }}
                              className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, images: [...formData.images, '']})}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-brand-navy hover:text-brand-navy transition-colors"
                      >
                        + Añadir imagen
                      </button>
                    </div>
                  </div>

                  {formData.images[0] && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">Vista previa</h3>
                        <button
                          type="button"
                          onClick={() => setShowPreview(!showPreview)}
                          className="text-brand-navy flex items-center"
                        >
                          {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                          {showPreview ? "Ocultar" : "Mostrar"}
                        </button>
                      </div>
                      
                      {showPreview && (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {formData.images.filter(img => img).map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg bg-gray-100"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg"
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-gradient-to-r from-brand-navy to-blue-900 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex gap-x-3">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon mt-0.5 icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>
                <h2 className="text-xl font-semibold mb-5"> Resumen del Vehículo</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-blue-200 text-sm">Vehículo</span>
                      <p className="font-semibold">{formData.vehicle || "Sin especificar"}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Marca y Modelo</span>
                      <p className="font-semibold">{formData.brand && formData.model ? `${formData.brand} ${formData.model}` : "Sin especificar"}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Año</span>
                      <p className="font-semibold">{formData.year || "Sin especificar"}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Precio</span>
                      <p className="font-semibold">
                        {formData.price ? `€${Number(formData.price).toLocaleString()}` : "Sin especificar"}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Combustible</span>
                      <p className="font-semibold">{formData.fuel || "Sin especificar"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-blue-200 text-sm">Kilómetros</span>
                      <p className="font-semibold">
                        {formData.kms ? `${Number(formData.kms).toLocaleString()} km` : "Sin especificar"}
                      </p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Matrícula</span>
                      <p className="font-semibold">{formData.plate || "Sin especificar"}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Estado</span>
                      <p className="font-semibold">{formData.status}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Concesionario</span>
                      <p className="font-semibold">{formData.dealer || "Sin especificar"}</p>
                    </div>
                    <div>
                      <span className="text-blue-200 text-sm">Características</span>
                      <p className="font-semibold">{formData.features.length} características</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </button>

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-brand-navy text-white flex items-center px-6 py-2 rounded-lg hover:bg-brand-navy/90 transition-colors"
                >
                  Siguiente
                  <ArrowLeft className="w-4 h-4 ml-2 transform rotate-180" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Vehículo
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
