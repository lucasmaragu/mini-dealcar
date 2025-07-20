export interface SearchInputProps{
    placeholder?: string
    onSearch: (query: string) => void
}

export interface Car {
  id: number
  vehicle: string
  brand: string
  model: string
  year: number
  price: number
  originalPrice?: number
  kms: number
  plate: string
  status: string
  etiq: string
  days: number
  color: string
  fuel: string
  transmission: string
  doors: number
  seats: number
  power: string
  consumption: string
  emissions: string
  portals: string[]
  portalUrls?: { [key: string]: string }
  image?: string
  images: string[]
  description: string
  features: string[]
  location: string
  dealer: {
    name: string
    phone: string
    email: string
    rating: number
    reviews: number
  }
  history: Array<{
    date: string
    event: string
    type: "info" | "success" | "warning" | "error"
  }>
  maintenance: Array<{
    date: string
    service: string
    cost: number
  }>
}

export interface FormData {
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
  history: Array<{
    date: string
    event: string
    type: "info" | "success" | "warning" | "error"
  }>
  maintenance: Array<{
    date: string
    service: string
    cost: number
  }>
  portalUrls: { [key: string]: string }
  portals: string[]
  images: string[]
}


export interface Sale {
  id: number
  vehicleModel: string
  clientName: string
  salePrice: number
  date: string
  status: string
  salesPerson: string
  commission: number
  paymentMethod: string
}

export interface CarsContextType {
  cars: Car[]
  loading: boolean
  addCar: (newCarData: any) => Car
  updateCar: (id: number, updatedData: Partial<Car>) => void
  deleteCar: (id: number) => void
  getCarById: (id: number) => Car | undefined
  clearUserCars: () => boolean
  refreshCars: () => void
}

export interface SimpleDropdownProps {
  label: string
  options: string[]
  selected: string
  onSelect: (option: string) => void
  placeholder?: string
}