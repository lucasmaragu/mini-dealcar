"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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

  // Solo mostrar loading si los datos de cars están cargando o si no hemos encontrado el coche aún
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full   px-6 py-4">
          <div className="flex items-center  justify-between">
            <div className="flex items-center justify-between gap-x-30">
              <button
                onClick={() => router.push("/cars")}
                className="text-gray-600 flex hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2 mt-0.5" />
                Volver
              </button>
              <div>
                <h1 className="text-2xl font-bold text-brand-navy">{car.vehicle}</h1>
                <p className="text-sm text-gray-600">
                  {car.brand} • {car.year} • {car.kms.toLocaleString()} km
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`${isFavorite ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button  className="text-gray-500 hover:text-gray-700">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="bg-brand-navy flex rounded-lg px-3 py-2 hover:bg-brand-navy/90">
                <Edit className="w-4 h-4 mr-2 mt-1" />
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative">
                <img
                  src={car.images[selectedImage] || "/placeholder.svg"}
                  alt={car.vehicle}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
                <div className="absolute top-4 right-4">
                  <button
                  
                    onClick={() => setIsImageModalOpen(true)}
                    className="bg-black/50 flex rounded-full px-2 text-white hover:bg-black/70"
                  >
                    <ZoomIn className="w-4 h-4 mt-1 mr-1" />
                    Ampliar
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/50 text-black">
                    <Camera className="w-3 h-3 mr-1.5 " />
                    {selectedImage + 1} / {car.images.length}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-3 overflow-x-auto">
                  {car.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-brand-navy" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-brand-navy text-brand-navy"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                      <p className="text-gray-700 leading-relaxed">{car.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Fuel className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Combustible</p>
                            <p className="font-semibold text-gray-900">{car.fuel}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Settings className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Transmisión</p>
                            <p className="font-semibold text-gray-900">{car.transmission}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Potencia</p>
                            <p className="font-semibold text-gray-900">{car.power}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Gauge className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Consumo</p>
                            <p className="font-semibold text-gray-900">{car.consumption}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Emisiones</p>
                            <p className="font-semibold text-gray-900">{car.emissions}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Car className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Puertas / Plazas</p>
                            <p className="font-semibold text-gray-900">
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipamiento y Extras</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {car.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Mantenimiento</h3>
                    <div className="space-y-4">
                      {car.maintenance.map((item, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Shield className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.service}</p>
                              <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">€{item.cost}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === "history" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial del Vehículo</h3>
                    <div className="space-y-4">
                      {car.history.map((item, index: number) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              item.type === "success"
                                ? "bg-green-500"
                                : item.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{item.event}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
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
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-6 h-6 text-brand-navy" />
                  <span className="text-3xl font-bold text-brand-navy">€{car.price.toLocaleString()}</span>
                </div>
                {car.originalPrice && car.originalPrice > car.price && (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg text-gray-500 line-through">€{car.originalPrice.toLocaleString()}</span>
                    <Badge className="bg-red-100 text-red-800">
                      -€{(car.originalPrice - car.price).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <Badge className={getStatusColor(car.status)}>{car.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Etiqueta:</span>
                  <Badge className={getEtiqColor(car.etiq)}>{car.etiq}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Días en stock:</span>
                  <span className="font-semibold text-gray-800">{car.days} días</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex justify-center cursor-pointer py-2 rounded-xl bg-brand-navy hover:bg-brand-navy/90">
                  <Phone className="w-4 h-4 mt-1 mr-2" />
                  Contactar
                </button>
                <button  className="w-full cursor-pointer flex border rounded-xl border-gray-300 py-2 justify-center text-black bg-transparent">
                  <Eye className="w-4 h-4 mt-1 mr-2" />
                  Programar Visita
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Rápida</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Año</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Kilómetros</p>
                    <p className="font-semibold">{car.kms.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Hash className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Matrícula</p>
                    <p className="font-semibold">{car.plate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-semibold">{car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Concesionario</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">{car.dealer.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(car.dealer.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {car.dealer.rating} ({car.dealer.reviews} reseñas)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{car.dealer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{car.dealer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portals */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Publicado en</h3>
              <div className="space-y-3 text-gray-600">
                {car.portalUrls && Object.entries(car.portalUrls).map(([portal, url]) => (
                  <a
                    key={portal}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{portal}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
                {(!car.portalUrls || Object.keys(car.portalUrls).length === 0) && (
                  <p className="text-gray-500 text-sm">No hay portales configurados</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={car.images[selectedImage] || "/placeholder.svg"}
              alt={car.vehicle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {car.images.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full ${selectedImage === index ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
