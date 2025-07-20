"use client"

import { Car, LayoutDashboard, Users, Settings, Search, Bell, ChevronDown, Edit, Plus, Menu, X, Trash2, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useCars } from "@/hooks/useCars"

const sideBarItems = [
  { icon: TrendingUp, label: "Ventas", active: false },
  { icon: Car, label: "Cars", active: true },
  { icon: Users, label: "Customers", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { clearUserCars, cars } = useCars()
  const [isClearing, setIsClearing] = useState(false)

  // Calcular cuántos vehículos son del usuario (localStorage)
  const userCarsCount = cars.filter(car => car.id > 6).length // Asumiendo que los primeros 6 son los originales

  const handleClearUserCars = async () => {
    if (userCarsCount === 0) {
      alert("No hay vehículos de usuario para eliminar.")
      return
    }

    const confirmed = confirm(`¿Estás seguro de que quieres eliminar todos los ${userCarsCount} vehículos creados por ti? Esta acción no se puede deshacer.`)
    
    if (confirmed) {
      setIsClearing(true)
      try {
        await clearUserCars()
        alert("Todos los vehículos de usuario han sido eliminados correctamente.")
        setIsOpen(false) // Cerrar sidebar en móvil
      } catch (error) {
        alert("Error al eliminar los vehículos. Por favor, inténtalo de nuevo.")
        console.error("Error clearing user cars:", error)
      } finally {
        setIsClearing(false)
      }
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
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
              className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-2 flex-1">
            {sideBarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setIsOpen(false)} // Close menu on mobile when item is clicked
                className={`w-full flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-2xl text-left transition-colors ${
                  item.active ? "bg-brand-blue text-gray-700 text-brand-navy font-bold" : "text-gray-600 font-medium hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}

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

          {/* Footer - Optional user info or logout */}
          <div className="p-4 border-t border-gray-200 lg:hidden">
            <div className="text-xs text-gray-500 text-center">
              DealCar Mini v1.0
            </div>
          </div>
        </div>
      </div>
    </>
  )
}