"use client"

import SearchInput from "@/components/SearchInput"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sale } from "@/lib/types"

interface SalesClientProps {
  salesData: Sale[]
}

const statusOptions = ["Todos", "Completada", "En proceso", "En revisión"]
const paymentOptions = ["Todos", "Contado", "Financiamiento"]

function getStatusVariant(status: string) {
  switch (status) {
    case "Completada":
      return "success"
    case "En proceso":
      return "warning"
    case "En revisión":
      return "secondary"
    default:
      return "secondary"
  }
}

export default function SalesClient({ salesData }: SalesClientProps) {
  const [filteredSales, setFilteredSales] = useState<Sale[]>(salesData)
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [paymentFilter, setPaymentFilter] = useState("Todos")

  const handleSearch = (query: string) => {
    applyFilters(query, statusFilter, paymentFilter)
  }

  const applyFilters = (searchQuery: string, status: string, payment: string) => {
    let result = salesData

    // Filter by search query
    if (searchQuery) {
      const lower = searchQuery.toLowerCase()
      result = result.filter(
        (sale) => 
          sale.vehicleModel.toLowerCase().includes(lower) || 
          sale.clientName.toLowerCase().includes(lower) ||
          sale.salesPerson.toLowerCase().includes(lower)
      )
    }

    // Filter by status
    if (status !== "Todos") {
      result = result.filter((sale) => sale.status === status)
    }

    // Filter by payment method
    if (payment !== "Todos") {
      result = result.filter((sale) => sale.paymentMethod === payment)
    }

    setFilteredSales(result)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters("", status, paymentFilter)
  }

  const handlePaymentFilter = (payment: string) => {
    setPaymentFilter(payment)
    applyFilters("", statusFilter, payment)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <SearchInput 
            onSearch={handleSearch} 
            placeholder="Buscar por vehículo, cliente o vendedor..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => handlePaymentFilter(e.target.value)}
            className="px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {paymentOptions.map((payment) => (
              <option key={payment} value={payment}>
                {payment}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista de Ventas ({filteredSales.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pago
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{sale.vehicleModel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{sale.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{formatCurrency(sale.salePrice)}</div>
                    <div className="text-sm text-gray-500">Comisión: {formatCurrency(sale.commission)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {formatDate(sale.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusVariant(sale.status)}>
                      {sale.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    {sale.salesPerson}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sale.paymentMethod === 'Contado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron ventas que coincidan con los filtros.</p>
          </div>
        )}
      </div>
    </>
  )
}
