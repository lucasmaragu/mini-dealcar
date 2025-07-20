"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Save, X, Eye, EyeOff, Check, AlertCircle, Info, Car, Euro, Calendar, Gauge, Hash, Tag, Globe, ImageIcon, Settings, FileText, Building, Plus, Minus, MapPin } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useCars } from "@/contexts/CarsContext"
import { FormData } from "@/lib/types"


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


export default function AddVehiclePage() {
  const router = useRouter()
  const { addCar } = useCars()
  
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
    history: [],
    maintenance: [],
    portalUrls: {},
    portals: [],
    images: [""]
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  
  const [newHistoryEvent, setNewHistoryEvent] = useState({ date: "", event: "", type: "info" as "info" | "success" | "warning" | "error" })
  const [newMaintenanceRecord, setNewMaintenanceRecord] = useState({ date: "", service: "", cost: "" })

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

  const updatePortalUrl = (portal: string, value: string) => {
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

  const handleAddHistoryEvent = () => {
    if (newHistoryEvent.date && newHistoryEvent.event) {
      setFormData(prev => ({
        ...prev,
        history: [...prev.history, { ...newHistoryEvent }]
      }))
      setNewHistoryEvent({ date: "", event: "", type: "info" })
    }
  }

  const handleRemoveHistoryEvent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== index)
    }))
  }

  const handleAddMaintenanceRecord = () => {
    if (newMaintenanceRecord.date && newMaintenanceRecord.service && newMaintenanceRecord.cost) {
      setFormData(prev => ({
        ...prev,
        maintenance: [...prev.maintenance, { 
          ...newMaintenanceRecord, 
          cost: parseFloat(newMaintenanceRecord.cost) 
        }]
      }))
      setNewMaintenanceRecord({ date: "", service: "", cost: "" })
    }
  }

  const handleRemoveMaintenanceRecord = (index: number) => {
    setFormData(prev => ({
      ...prev,
      maintenance: prev.maintenance.filter((_, i) => i !== index)
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

    // El step 6 no es obligatorio para avanzar, solo para el submit final
    // if (step === 6) {
    //   if (!formData.dealer.trim()) newErrors.dealer = "El nombre del concesionario es obligatorio"
    //   if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria"
    // }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función separada para validar todo al final
  const validateAllSteps = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.vehicle.trim()) newErrors.vehicle = "El nombre del vehículo es obligatorio"
    if (!formData.brand.trim()) newErrors.brand = "La marca es obligatoria"
    if (!formData.year.trim()) newErrors.year = "El año es obligatorio"
    if (!formData.price.trim()) newErrors.price = "El precio es obligatorio"
    if (!formData.kms.trim()) newErrors.kms = "Los kilómetros son obligatorios"
    if (!formData.plate.trim()) newErrors.plate = "La matrícula es obligatoria"
    
    if (formData.year && (isNaN(Number(formData.year)) || Number(formData.year) < 1900 || Number(formData.year) > new Date().getFullYear() + 1)) {
      newErrors.year = "Año inválido"
    }
    if (formData.price && (isNaN(Number(formData.price)) || Number(formData.price) <= 0)) {
      newErrors.price = "Precio inválido"
    }
    if (formData.kms && (isNaN(Number(formData.kms)) || Number(formData.kms) < 0)) {
      newErrors.kms = "Kilómetros inválidos"
    }

    if (!formData.fuel.trim()) newErrors.fuel = "El tipo de combustible es obligatorio"
    if (!formData.transmission.trim()) newErrors.transmission = "La transmisión es obligatoria"
    if (!formData.color.trim()) newErrors.color = "El color es obligatorio"

    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"

    if (!formData.dealer.trim()) newErrors.dealer = "El nombre del concesionario es obligatorio"
    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep !== 7) {
      e.preventDefault()
      if (currentStep < 7 && validateStep(currentStep)) {
        setCurrentStep(prev => Math.min(prev + 1, 7))
      }
    }
  }

  const nextStep = () => {
    console.log("🔵 nextStep ejecutado - currentStep:", currentStep)
    if (validateStep(currentStep)) {
      console.log("✅ Validación exitosa, avanzando al paso:", currentStep + 1)
      setCurrentStep(prev => Math.min(prev + 1, 7))
    } else {
      console.log("❌ Validación falló para el paso:", currentStep)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const isStepValid = (step: number) => {
    if (step === 1) {
      return formData.vehicle.trim() !== "" && 
             formData.brand.trim() !== "" && 
             formData.year.trim() !== "" && 
             formData.price.trim() !== "" && 
             formData.kms.trim() !== "" && 
             formData.plate.trim() !== "" &&
             !isNaN(Number(formData.year)) && 
             Number(formData.year) >= 1900 && 
             Number(formData.year) <= new Date().getFullYear() + 1 &&
             !isNaN(Number(formData.price)) && 
             Number(formData.price) > 0 &&
             !isNaN(Number(formData.kms)) && 
             Number(formData.kms) >= 0
    }
    
    if (step === 2) {
      return formData.fuel.trim() !== "" && 
             formData.transmission.trim() !== "" && 
             formData.color.trim() !== ""
    }

    if (step === 4) {
      return formData.description.trim() !== ""
    }

    if (step === 6) {
      return formData.dealer.trim() !== "" && formData.location.trim() !== ""
    }

    return true
  }

  const isStepAccessible = (stepId: number) => {
    if (stepId < currentStep) return true
    
    if (stepId === currentStep) return true
    
    if (stepId === currentStep + 1) {
      return isStepValid(currentStep)
    }
    
    return false
  }

  const navigateToStep = (stepId: number) => {
    if (isStepAccessible(stepId)) {
      setCurrentStep(stepId)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(" handleSubmit ejecutado - currentStep:", currentStep)
    e.preventDefault()
    e.stopPropagation()
    
    if (currentStep !== 7) {
      
      return false
    }
    
    console.log("✅ Submit permitido en paso 7")
    
    if (!validateAllSteps()) {
      if (errors.vehicle || errors.brand || errors.year || errors.price || errors.kms || errors.plate) {
        setCurrentStep(1)
      } else if (errors.fuel || errors.transmission || errors.color) {
        setCurrentStep(2)
      } else if (errors.description) {
        setCurrentStep(4)
      } else if (errors.dealer || errors.location) {
        setCurrentStep(6)
      }
      return
    }

    setIsSubmitting(true)
    
    try {
      const validPortalUrls = Object.fromEntries(
        Object.entries(formData.portalUrls).filter(([key, url]) => url.trim() !== '')
      )
      const portals = Object.keys(validPortalUrls)

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
        image: formData.images.filter(img => img.trim() !== '')[0] || "", // Primera imagen del array como imagen principal
        portalUrls: validPortalUrls,
        portals: portals,
        location: formData.location,
        dealer: {
          name: formData.dealer,
          phone: "",
          email: "",
          rating: 0,
          reviews: 0
        },
        history: formData.history,
        maintenance: formData.maintenance
      }
      
      await addCar(newCar)
      
      router.push("/cars")
    } catch (error) {
      console.error("Error saving vehicle:", error)
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
      {/* Enhanced Header with Better UX */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => router.push("/cars")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Volver a la lista de vehículos"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Volver</span>
            </button>

            {/* Title and Current Step Info */}
            <div className="flex-1 text-center mx-4">
              <h1 className="text-xl sm:text-2xl font-bold text-brand-navy">
                Añadir Nuevo Vehículo
              </h1>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <span className="text-sm text-gray-600">
                  Paso {currentStep} de {steps.length}:
                </span>
                <span className="text-sm font-medium text-brand-navy">
                  {steps.find(s => s.id === currentStep)?.title}
                </span>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden lg:flex items-center space-x-3 min-w-[200px]">
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-brand-navy to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {Math.round(getStepProgress())}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="lg:hidden mt-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-gray-500">Progreso:</span>
              <span className="text-xs font-medium text-brand-navy">
                {Math.round(getStepProgress())}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-brand-navy to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Step Navigation */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center" aria-label="Pasos del formulario">
            <ol className="flex items-center space-x-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                const isAccessible = isStepAccessible(step.id)
                
                return (
                  <li key={step.id} className="flex items-center">
                    {/* Step Button */}
                    <button
                      onClick={() => navigateToStep(step.id)}
                      disabled={!isStepAccessible(step.id)}
                      className={`group relative flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy min-w-[120px] ${
                        isActive 
                          ? "bg-brand-navy text-white shadow-lg transform scale-105" 
                          : isCompleted
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200"
                            : isStepAccessible(step.id)
                              ? "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                              : "bg-gray-50 text-gray-400 cursor-not-allowed border-2 border-gray-100"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`${step.title}${isCompleted ? ' - Completado' : isActive ? ' - Paso actual' : ''}`}
                    >
                      {/* Step Icon */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 transition-colors ${
                        isActive 
                          ? "bg-white/20" 
                          : isCompleted
                            ? "bg-green-100"
                            : "bg-gray-100"
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Icon className={`w-5 h-5 ${
                            isActive ? "text-white" : isAccessible ? "text-gray-600" : "text-gray-400"
                          }`} />
                        )}
                      </div>
                      
                      {/* Step Title */}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isActive ? "text-white" : isCompleted ? "text-green-700" : "text-gray-600"
                      }`}>
                        {step.title}
                      </span>

                      {/* Step Number */}
                      <span className={`absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full border-2 ${
                        isActive
                          ? "bg-white text-brand-navy border-white"
                          : isCompleted
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-gray-200 text-gray-500 border-gray-200"
                      }`}>
                        {step.id}
                      </span>

                      {/* Active Step Indicator */}
                      {isActive && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-3 h-3 bg-brand-navy rotate-45 border-l-2 border-t-2 border-white"></div>
                        </div>
                      )}
                    </button>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-1 mx-2 rounded-full transition-colors ${
                        isCompleted ? "bg-green-300" : "bg-gray-200"
                      }`} />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {steps.find(s => s.id === currentStep)?.title}
              </h3>
              <span className="px-3 py-1 bg-brand-navy text-white text-sm rounded-full font-medium">
                {currentStep}/{steps.length}
              </span>
            </div>
            
            {/* Mobile Step Dots */}
            <div className="flex items-center justify-center space-x-2">
              {steps.map((step) => {
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <button
                    key={step.id}
                    onClick={() => navigateToStep(step.id)}
                    disabled={!isStepAccessible(step.id)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 ${
                      isActive 
                        ? "bg-brand-navy scale-150" 
                        : isCompleted
                          ? "bg-green-500"
                          : isStepAccessible(step.id)
                            ? "bg-blue-300 hover:bg-blue-400"
                            : "bg-gray-300"
                    }`}
                    aria-label={`Ir al paso ${step.id}: ${step.title}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl text-gray-800  mx-auto px-6 py-8">
        <div className="form-container">
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

          {/* Step 5: Portales de Venta */}
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
                    value={formData.portalUrls["Coches.net"] || ""}
                    onChange={(e) => updatePortalUrl('Coches.net', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL AutoScout24
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.autoscout24.com/..."
                    value={formData.portalUrls["AutoScout24"] || ""}
                    onChange={(e) => updatePortalUrl('AutoScout24', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Milanuncios
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.milanuncios.com/..."
                    value={formData.portalUrls["Milanuncios"] || ""}
                    onChange={(e) => updatePortalUrl('Milanuncios', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Otros Portales
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.portalUrls["Otros"] || ""}
                    onChange={(e) => updatePortalUrl('Otros', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Concesionario y Ubicación */}
          {currentStep === 6 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Concesionario y Ubicación</h2>
                    <p className="text-sm text-gray-600">Información del vendedor y historial del vehículo</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>Concesionario *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del concesionario"
                      value={formData.dealer}
                      onChange={(e) => handleInputChange("dealer", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                        errors.dealer 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-brand-navy"
                      }`}
                    />
                    {errors.dealer && (
                      <div className="flex items-center space-x-2 mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.dealer}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>Ubicación *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad, País"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                        errors.location 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-brand-navy"
                      }`}
                    />
                    {errors.location && (
                      <div className="flex items-center space-x-2 mt-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <FileText className="w-4 h-4" />
                    <span>Historial del Vehículo</span>
                  </label>
                  
                  {/* Add History Event */}
                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="date"
                        value={newHistoryEvent.date}
                        onChange={(e) => setNewHistoryEvent(prev => ({...prev, date: e.target.value}))}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Evento (ej: Primera visita)"
                        value={newHistoryEvent.event}
                        onChange={(e) => setNewHistoryEvent(prev => ({...prev, event: e.target.value}))}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      />
                      <div className="flex space-x-2">
                        <select
                          value={newHistoryEvent.type}
                          onChange={(e) => setNewHistoryEvent(prev => ({...prev, type: e.target.value as "info" | "success" | "warning" | "error"}))}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                        >
                          <option value="info">Info</option>
                          <option value="success">Éxito</option>
                          <option value="warning">Advertencia</option>
                          <option value="error">Error</option>
                        </select>
                        <button
                          type="button"
                          onClick={handleAddHistoryEvent}
                          className="bg-brand-navy text-white px-6 py-3 rounded-xl hover:bg-brand-navy/90 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Añadir</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* History Events List */}
                  {formData.history.length > 0 && (
                    <div className="space-y-3">
                      {formData.history.map((event, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                            event.type === "success" ? "bg-green-50 border-green-500" :
                            event.type === "warning" ? "bg-yellow-50 border-yellow-500" :
                            event.type === "error" ? "bg-red-50 border-red-500" :
                            "bg-blue-50 border-blue-500"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                event.type === "success" ? "bg-green-100 text-green-800" :
                                event.type === "warning" ? "bg-yellow-100 text-yellow-800" :
                                event.type === "error" ? "bg-red-100 text-red-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {event.type.toUpperCase()}
                              </span>
                              <span className="text-gray-600 text-sm">{event.date}</span>
                            </div>
                            <p className="text-gray-900 mt-1">{event.event}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveHistoryEvent(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.history.length === 0 && (
                    <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                      <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <p>No se han añadido eventos de historial</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                    <Settings className="w-4 h-4" />
                    <span>Mantenimiento</span>
                  </label>
                  
                  {/* Add Maintenance Record */}
                  <div className="space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="date"
                        value={newMaintenanceRecord.date}
                        onChange={(e) => setNewMaintenanceRecord(prev => ({...prev, date: e.target.value}))}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Servicio (ej: Cambio de aceite)"
                        value={newMaintenanceRecord.service}
                        onChange={(e) => setNewMaintenanceRecord(prev => ({...prev, service: e.target.value}))}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      />
                      <input
                        type="number"
                        placeholder="Coste €"
                        value={newMaintenanceRecord.cost}
                        onChange={(e) => setNewMaintenanceRecord(prev => ({...prev, cost: e.target.value}))}
                        onKeyDown={handleKeyDown}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-navy transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleAddMaintenanceRecord}
                        className="bg-brand-navy text-white px-6 py-3 rounded-xl hover:bg-brand-navy/90 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Añadir</span>
                      </button>
                    </div>
                  </div>

                  {/* Maintenance Records List */}
                  {formData.maintenance.length > 0 && (
                    <div className="space-y-3">
                      {formData.maintenance.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-600 text-sm">{record.date}</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                €{record.cost.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-gray-900 mt-1">{record.service}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMaintenanceRecord(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {formData.maintenance.length === 0 && (
                    <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                      <Info className="w-6 h-6 mx-auto mb-2 opacity-50" />
                      <p>No se han añadido registros de mantenimiento</p>
                    </div>
                  )}
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
                              <Image
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                width={300}
                                height={128}
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
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon mt-0.5 icon-tabler icons-tabler-outline icon-tabler-car"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></svg>
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
                  type="button"
                  onClick={(e) => {
                    console.log("🟢 Botón Guardar presionado en paso:", currentStep)
                    handleSubmit(e as React.MouseEvent<HTMLButtonElement>)
                  }}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 px-8 py-2 rounded-lg text-white flex items-center transition-colors"
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
        </div>
      </div>
    </div>
  )
}
