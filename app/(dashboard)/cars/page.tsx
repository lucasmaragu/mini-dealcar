"use client"

import SearchInput from "@/components/SearchInput"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Edit, Filter, ChevronDown } from "lucide-react"
import SimpleDropdown from "@/components/SimpleDropdown"
import { Badge, getStatusVariant, getEtiqVariant } from "@/components/ui/badge"
import { useCars } from "@/hooks/useCars"


const statusOptions = ["Todos", "En preparación", "Disponibles", "Reservados", "Vendidos"]
const brandOptions = ["Todas", "Audi", "BMW", "Ford", "Tesla", "Toyota"]
const etiqOptions = ["Todas", "0", "ECO", "B", "C"]

export default function CarPage() {
  const router = useRouter()
  const { cars, loading } = useCars()
  const [filtered, setFiltered] = useState(cars)
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [brandFilter, setBrandFilter] = useState("Todas")
  const [etiqFilter, setEtiqFilter] = useState("Todas")

  // Actualizar filtered cuando cars cambie
  useEffect(() => {
    setFiltered(cars)
  }, [cars])

  const handleSearch = (query: string) => {
    applyFilters(query, statusFilter, brandFilter, etiqFilter)
  }

  const applyFilters = (searchQuery: string, status: string, brand: string, etiq: string) => {
    let result = cars

    // Filter by search query
    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      result = result.filter(
        (car) => car.vehicle.toLowerCase().includes(lower) || car.plate.toLowerCase().includes(lower),
      )
    }

    // Filter by status
    if (status !== "Todos") {
      result = result.filter((car) => car.status === status)
    }

    // Filter by brand
    if (brand !== "Todas") {
      result = result.filter((car) => car.brand === brand)
    }

    // Filter by etiq
    if (etiq !== "Todas") {
      result = result.filter((car) => car.etiq === etiq)
    }

    setFiltered(result)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters("", status, brandFilter, etiqFilter)
  }

  const handleBrandFilter = (brand: string) => {
    setBrandFilter(brand)
    applyFilters("", statusFilter, brand, etiqFilter)
  }

  const handleEtiqFilter = (etiq: string) => {
    setEtiqFilter(etiq)
    applyFilters("", statusFilter, brandFilter, etiq)
  }

  if (loading) {
    return (
      <div className="p-6 bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando vehículos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-brand-light min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <SearchInput onSearch={handleSearch} />
        </div>
        <button 
          onClick={() => router.push("/cars/add")}
          className="inline-flex items-center bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 shadow-sm cursor-pointer"
        >
          + Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Filter Header */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Filtros</span>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <SimpleDropdown
              label="Estado"
              options={statusOptions}
              selected={statusFilter}
              onSelect={handleStatusFilter}
            />

            <SimpleDropdown
              label="Marca"
              options={brandOptions}
              selected={brandFilter}
              onSelect={handleBrandFilter}
            />

            <SimpleDropdown
              label="Etiqueta"
              options={etiqOptions}
              selected={etiqFilter}
              onSelect={handleEtiqFilter}
            />

            {/* Clear Filters Button */}
            {(statusFilter !== "Todos" || brandFilter !== "Todas" || etiqFilter !== "Todas") && (
              <button
                onClick={() => {
                  setStatusFilter("Todos")
                  setBrandFilter("Todas")
                  setEtiqFilter("Todas")
                  applyFilters("", "Todos", "Todas", "Todas")
                }}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Summary - Only show if filters are active */}
        {(statusFilter !== "Todos" || brandFilter !== "Todas" || etiqFilter !== "Todas") && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">Activos:</span>
              {statusFilter !== "Todos" && (
                <Badge variant="primary" size="sm">
                  {statusFilter}
                </Badge>
              )}
              {brandFilter !== "Todas" && (
                <Badge variant="success" size="sm">
                  {brandFilter}
                </Badge>
              )}
              {etiqFilter !== "Todas" && (
                <Badge variant="purple" size="sm">
                  {etiqFilter}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-brand-navy">Vehículos</h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-navy text-white">
            {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>
        {filtered.length > 0 && (
          <div className="text-sm text-gray-500">
            Mostrando {filtered.length} de {cars.length} vehículos
          </div>
        )}
      </div>

      {/* Cars List - Horizontal Cards */}
      <div className="space-y-4">
        {filtered.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center space-x-6">
              {/* Car Image */}
              <div className="flex-shrink-0">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={car.vehicle}
                  className="w-48 h-32 object-cover rounded-xl bg-gray-100"
                />
              </div>

              {/* Car Details */}
              <div className="flex-1 grid grid-cols-4 gap-6">
                {/* Column 1 */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Vehículo</span>
                    <p className="text-sm font-semibold text-brand-navy mt-1">{car.vehicle}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Precio</span>
                    <p className="text-lg font-bold text-brand-navy mt-1">€{car.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Año</span>
                    <p className="text-sm font-semibold text-brand-navy mt-1">{car.year}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">KMS</span>
                    <p className="text-sm font-semibold text-brand-navy mt-1">{car.kms.toLocaleString()}</p>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Matrícula</span>
                    <p className="text-sm font-semibold text-brand-navy mt-1">{car.plate}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Días</span>
                    <p className="text-sm font-semibold text-brand-navy mt-1">{car.days}</p>
                  </div>
                </div>

                {/* Column 4 */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">ETIQ</span>
                    <div className="mt-1">
                      <Badge variant={getEtiqVariant(car.etiq)}>
                        {car.etiq}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Portales</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {car.portals.map((portal, index) => (
                        <Badge key={index} variant="secondary" size="sm">
                          {portal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex-shrink-0 flex flex-col items-end space-y-3">
                <Badge variant={getStatusVariant(car.status)}>
                  {car.status}
                </Badge>
                <button 
                  onClick={() => router.push(`/cars/${car.id}`)}
                  className="inline-flex items-center border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-1.5" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron vehículos</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}
