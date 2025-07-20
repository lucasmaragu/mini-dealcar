"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  Edit,
  Share2,
  Heart,
  Calendar,
  Gauge,
  Euro,
  Hash,
  MapPin,
  Clock,
  Globe,
  Phone,
  Mail,
  Star,
  Eye,
  ExternalLink,
  Car,
  Fuel,
  Settings,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Camera,
  ZoomIn,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { useCars  } from "@/hooks/useCars"
import { Car as CarType } from "@/lib/types"

export default function CarDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { getCarById, loading: carsLoading } = useCars()
  const [car, setCar] = useState<CarType | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const loading = carsLoading || (!car && !carsLoading)

  useEffect(() => {
    const fetchCar = () => {
      if (carsLoading) return
      
      const carData = getCarById(parseInt(params.id as string))
      setCar(carData || null)
    }

    if (params.id && !carsLoading) {
      fetchCar()
    }
  }, [params.id, getCarById, carsLoading])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-navy border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del vehículo...</p>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-6">El vehículo que buscas no existe o ha sido eliminado.</p>
          <button onClick={() => router.push("/cars")} className="bg-brand-navy hover:bg-brand-navy/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al listado
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponibles":
        return "bg-green-100 text-green-800"
      case "En preparación":
        return "bg-blue-100 text-blue-800"
      case "Reservados":
        return "bg-yellow-100 text-yellow-800"
      case "Vendidos":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEtiqColor = (etiq: string) => {
    switch (etiq) {
      case "0":
        return "bg-blue-100 text-blue-800"
      case "ECO":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      case "C":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const tabs = [
    { id: "overview", label: "Resumen", icon: Car },
    { id: "features", label: "Características", icon: Settings },
    { id: "maintenance", label: "Mantenimiento", icon: Shield },
    { id: "history", label: "Historial", icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">

      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
  
            <div className="flex items-center gap-3 sm:gap-4 ml-8 sm:ml-15  md:ml-15 lg:ml-0  lg:gap-6 min-w-0 flex-1">
              <button
                onClick={() => router.push("/cars")}
                className="text-gray-600 hidden cursor-pointer sm:flex flex items-center hover:text-gray-900 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </button>
              <div className="min-w-0 flex-1 ml-6 sm:ml-0">
                <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-brand-navy truncate">
                  {car.vehicle}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {car.brand} • {car.year} • {car.kms.toLocaleString()} km
                </p>
              </div>
            </div>

            
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-1.5 sm:p-2 rounded-full ${isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-500 hover:bg-gray-100 transition-all`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Contennt */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Image  Gallery */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                <Image
                  src={car.images?.filter(img => img && img.trim() !== '')[selectedImage] || "/placeholder.svg"}
                  alt={car.vehicle}
                  width={800}
                  height={384}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                  <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="bg-black/50 flex items-center rounded-full px-2 py-1 sm:px-2 sm:py-1 text-white hover:bg-black/70 transition-all text-xs sm:text-sm"
                  >
                    <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Ampliar</span>
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                  <Badge className="bg-black/50 text-white text-xs">
                    <Camera className="w-3 h-3 mr-1" />
                    {selectedImage + 1} / {car.images?.filter(img => img && img.trim() !== '').length || 0}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-3 sm:p-4">
                <div className="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide">
                  {car.images?.filter(img => img && img.trim() !== '').map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-brand-navy" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Vista ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto scrollbar-hide px-3 sm:px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap mr-4 sm:mr-6 lg:mr-8 last:mr-0 ${
                          activeTab === tab.id
                            ? "border-brand-navy text-brand-navy"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-3 sm:p-4 lg:p-6">
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Descripción</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{car.description}</p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Especificaciones Técnicas</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Combustible</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{car.fuel}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Transmisión</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{car.transmission}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Potencia</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{car.power}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Consumo</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{car.consumption}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Emisiones</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{car.emissions}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Car className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">Puertas / Plazas</p>
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {car.doors} / {car.seats}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === "features" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Equipamiento y Extras</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {car.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Historial de Mantenimiento</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {car.maintenance.map((item, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-0">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm sm:text-base font-semibold text-gray-900">{item.service}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{item.date}</p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-sm sm:text-base font-semibold text-gray-900">€{item.cost}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Historial del Vehículo</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {car.history.map((item, index: number) => (
                        <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 flex-shrink-0 ${
                              item.type === "success"
                                ? "bg-green-500"
                                : item.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-semibold text-gray-900">{item.event}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-brand-navy" />
                  <span className="text-2xl sm:text-3xl font-bold text-brand-navy">€{car.price.toLocaleString()}</span>
                </div>
                {car.originalPrice && car.originalPrice > car.price && (
                  <div className="flex items-center justify-center space-x-2 flex-wrap">
                    <span className="text-base sm:text-lg text-gray-500 line-through">€{car.originalPrice.toLocaleString()}</span>
                    <Badge className="bg-red-100 text-red-800 text-xs sm:text-sm">
                      -€{(car.originalPrice - car.price).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Estado:</span>
                  <Badge className={`${getStatusColor(car.status)} text-xs sm:text-sm`}>{car.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Etiqueta:</span>
                  <Badge className={`${getEtiqColor(car.etiq)} text-xs sm:text-sm`}>{car.etiq}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Días en stock:</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800">{car.days} días</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center text-white hover:bg-brand-navy/90 bg-brand-navy border transition-all py-2 sm:py-3 lg:py-2.5 rounded-xl text-sm sm:text-base cursor-pointer lg:text-sm font-medium">
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar
                </button>
                <button className="w-full flex items-center justify-center border rounded-xl border-gray-300 cursor-pointer py-2 sm:py-3 lg:py-2.5 text-gray-900 bg-transparent hover:bg-gray-50 transition-all text-sm sm:text-base lg:text-sm font-medium">
                  <Eye className="w-4 h-4 mr-2" />
                  Programar Visita
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Información Rápida</h3>
              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Año</p>
                    <p className="text-sm sm:text-base font-semibold truncate">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Kilómetros</p>
                    <p className="text-sm sm:text-base font-semibold truncate">{car.kms.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Matrícula</p>
                    <p className="text-sm sm:text-base font-semibold truncate">{car.plate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Ubicación</p>
                    <p className="text-sm sm:text-base font-semibold truncate">{car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Concesionario</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{car.dealer.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 gap-1 sm:gap-0">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(car.dealer.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {car.dealer.rating} ({car.dealer.reviews} reseñas)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{car.dealer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{car.dealer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portals */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Publicado en</h3>
              <div className="space-y-2 sm:space-y-3 text-gray-600">
                {car.portalUrls && Object.entries(car.portalUrls).map(([portal, url]) => (
                  <a
                    key={portal}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">{portal}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  </a>
                ))}
                {(!car.portalUrls || Object.keys(car.portalUrls).length === 0) && (
                  <p className="text-gray-500 text-xs sm:text-sm">No hay portales configurados</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            </button>
            
            {/* Previous button */}
            {car.images && car.images.filter(img => img && img.trim() !== '').length > 1 && (
              <button
                onClick={() => setSelectedImage(selectedImage === 0 ? car.images.filter(img => img && img.trim() !== '').length - 1 : selectedImage - 1)}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
            
            {/* Next button */}
            {car.images && car.images.filter(img => img && img.trim() !== '').length > 1 && (
              <button
                onClick={() => setSelectedImage(selectedImage === car.images.filter(img => img && img.trim() !== '').length - 1 ? 0 : selectedImage + 1)}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
              </button>
            )}
            
            <Image
              src={car.images?.filter(img => img && img.trim() !== '')[selectedImage] || "/placeholder.svg"}
              alt={car.vehicle}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-lg"
              priority
            />
            
            {/* Image counter and dots */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                {selectedImage + 1} / {car.images?.filter(img => img && img.trim() !== '').length || 0}
              </div>
              {car.images && car.images.filter(img => img && img.trim() !== '').length > 1 && (
                <div className="flex space-x-1 sm:space-x-2 max-w-xs overflow-x-auto scrollbar-hide">
                  {car.images?.filter(img => img && img.trim() !== '').map((_, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        selectedImage === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
