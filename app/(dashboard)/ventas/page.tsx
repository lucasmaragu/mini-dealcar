
import { CalendarDays, TrendingUp, DollarSign, User, Car } from "lucide-react"
import { sales, salesStats } from "@/lib/data"
import { Suspense } from "react"
import SalesClient from "./SalesClient"

// Función que simula obtener datos de ventas del servidor (SSR)
async function getSalesData() {
  await new Promise(resolve => setTimeout(resolve, 300))
  return sales
}

// Función para obtener estadísticas (SSR)
async function getSalesStats() {
  await new Promise(resolve => setTimeout(resolve, 200))
  return salesStats
}



// Componente de carga para Suspense
function LoadingSkeleton() {
  return (
    <div className="p-4">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="flex justify-between mb-6">
          <div className="h-10 bg-gray-300 rounded-xl w-64"></div>
          <div className="h-10 bg-gray-300 rounded-xl w-32"></div>
        </div>
        
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 py-3 border-b border-gray-200">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                <div className="h-6 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal SSR
export default async function SalesPage() {
  // Los datos se obtienen en el servidor (SSR)
  const [salesData, statsData] = await Promise.all([
    getSalesData(),
    getSalesStats()
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex ml-15 lg:ml-0 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Ventas</h1>
          <p className="text-gray-600">Controla todas las compraventas de la aplicación</p>
        </div>
        
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Ventas</p>
              <p className="text-2xl font-bold text-gray-900">{statsData.totalSales}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(statsData.totalRevenue)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(statsData.avgSalePrice)}</p>
            </div>
            <Car className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-gray-900">{statsData.completedSales}</p>
            </div>
            <User className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crecimiento</p>
              <p className="text-2xl font-bold text-gray-900">+{statsData.monthlyGrowth}%</p>
            </div>
            <CalendarDays className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

    
      <SalesClient salesData={salesData} />
    </div>
  )
}


