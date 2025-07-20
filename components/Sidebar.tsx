"use client"

import { Car, LayoutDashboard, Users, Settings, Search, Bell, ChevronDown, Edit, Plus, Menu, X, Trash2, TrendingUp, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useCars } from "@/contexts/CarsContext"
import { useRouter, usePathname } from "next/navigation"

// replace the old list
const sideBarItems = [
  { icon: TrendingUp, label: "Ventas",    href: "/ventas" },
  { icon: Car,       label: "Cars",      href: "/cars" },
  { icon: Users,     label: "Customers", href: "/customers", disabled: true, badge: "Próximamente" },
  { icon: Settings,  label: "Settings",  href: "/settings",  disabled: true, badge: "Próximamente" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { clearUserCars, cars } = useCars()
  const [isClearing, setIsClearing] = useState(false)

  const router = useRouter() 
  const pathname = usePathname()

  const userCarsCount = cars.filter(car => car.id > 6).length 

  const handleClearUserCars = async () => {
    if (userCarsCount === 0) {
      alert("No hay vehículos de usuario para eliminar.")
      return
    }

    // Mostrar el modal de confirmación
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsClearing(true)
    setShowDeleteModal(false)
    
    try {
      await clearUserCars()
      alert("Todos los vehículos de usuario han sido eliminados correctamente.")
      setIsOpen(false) 
    } catch (error) {
      alert("Error al eliminar los vehículos. Por favor, inténtalo de nuevo.")
      console.error("Error clearing user cars:", error)
    } finally {
      setIsClearing(false)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 cursor-pointer bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-auto
      `}>
        <div className="font-bold text-black h-full flex flex-col">
          {/* Header with close button on mobile */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-brand-navy">DealCar Mini</span>
            </div>
            
            {/* Close button - only visible on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden cursor-pointer p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-2 flex-1">
            {sideBarItems.map((item) => {
              const active = pathname === item.href
              const isDisabled = Boolean(item.disabled)
              const btnClass = `
                w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-2xl text-left transition-colors
                ${isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : active
                    ? "bg-brand-blue text-brand-navy font-bold"
                    : "text-gray-600 font-medium hover:bg-gray-50"}
              `
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    if (!isDisabled) {
                      router.push(item.href)
                      setIsOpen(false)
                    }
                  }}
                  disabled={isDisabled}
                  className={btnClass}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex items-center space-x-2">
                    <span>{item.label}</span>
                    {isDisabled && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}

            {/* Separator */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Clear User Cars Button */}
            <button
              onClick={handleClearUserCars}
              disabled={isClearing || userCarsCount === 0}
              className={`w-full flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-2xl text-left transition-colors ${
                userCarsCount === 0 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-red-600 font-medium hover:bg-red-50"
              } ${isClearing ? "opacity-50" : ""}`}
              title={userCarsCount === 0 ? "No hay vehículos de usuario para eliminar" : `Eliminar ${userCarsCount} vehículos de usuario`}
            >
              <Trash2 className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm">
                  {isClearing ? "Eliminando..." : "Limpiar mis vehículos"}
                </span>
                <span className="text-xs opacity-75">
                  {userCarsCount > 0 ? `${userCarsCount} vehículos` : "Sin vehículos"}
                </span>
              </div>
            </button>
          </nav>

          
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirmar eliminación
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                ¿Estás seguro de que quieres eliminar todos los{" "}
                <span className="font-semibold text-red-600">{userCarsCount} vehículos</span>{" "}
                creados por ti?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800 font-medium">
                      Advertencia importante
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      Una vez eliminados, no podrás recuperar estos vehículos. 
                      Asegúrate de tener copias de seguridad si las necesitas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={cancelDelete}
                disabled={isClearing}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={isClearing}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isClearing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar vehículos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}