import { ReactNode } from "react"

type BadgeVariant = 
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning" 
  | "danger"
  | "info"
  | "purple"
  | "orange"
  | "etiq0"
  | "etiqEco"
  | "etiqB"
  | "etiqC"
  | "available"
  | "preparation"
  | "reserved"
  | "sold"

type BadgeSize = "sm" | "default" | "lg"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
}

const getVariantClasses = (variant: BadgeVariant): string => {
  switch (variant) {
    case "primary":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "secondary":
      return "bg-gray-100 text-gray-600 hover:bg-gray-200"
    case "success":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "warning":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "danger":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    case "info":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "purple":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    case "orange":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200"
    // Variantes específicas para etiquetas de vehículos
    case "etiq0":
      return "bg-blue-100 text-blue-800"
    case "etiqEco":
      return "bg-green-100 text-green-800"
    case "etiqB":
      return "bg-yellow-100 text-yellow-800"
    case "etiqC":
      return "bg-orange-100 text-orange-800"
    // Variantes específicas para estados de vehículos
    case "available":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "preparation":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "reserved":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "sold":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    case "default":
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

const getSizeClasses = (size: BadgeSize): string => {
  switch (size) {
    case "sm":
      return "px-2 py-0.5 text-xs"
    case "lg":
      return "px-3 py-1 text-sm"
    case "default":
    default:
      return "px-2.5 py-0.5 text-xs"
  }
}

function Badge({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full font-medium transition-colors"
  const variantClasses = getVariantClasses(variant)
  const sizeClasses = getSizeClasses(size)
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

// Función helper para obtener la variante basada en el estado del vehículo
export const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "Disponibles":
      return "available"
    case "En preparación":
      return "preparation"
    case "Reservados":
      return "reserved"
    case "Vendidos":
      return "sold"
    default:
      return "default"
  }
}

// Función helper para obtener la variante basada en la etiqueta del vehículo
export const getEtiqVariant = (etiq: string): BadgeVariant => {
  switch (etiq) {
    case "0":
      return "etiq0"
    case "ECO":
      return "etiqEco"
    case "B":
      return "etiqB"
    case "C":
      return "etiqC"
    default:
      return "default"
  }
}

export { Badge }
