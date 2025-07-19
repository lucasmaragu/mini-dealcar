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
  portalUrls: {
    cochesNet: string
    autocasion: string
    motor: string
    milanuncios: string
  }
  portals: Record<string, string>
  images: string[]
}