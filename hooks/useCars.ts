"use client"

import { useState, useEffect } from "react"
import { cars as carsData } from "@/lib/data"

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

const STORAGE_KEY = "dealcar_vehicles"

export function useCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  // Cargar datos al inicializar
  useEffect(() => {
    const loadCars = () => {
      try {
        // Obtener vehículos del localStorage
        const savedCars = localStorage.getItem(STORAGE_KEY)
        const localCars = savedCars ? JSON.parse(savedCars) : []
        
        // Combinar con datos existentes de data.ts
        const allCars = [...(carsData as Car[]), ...localCars]
        
        setCars(allCars)
      } catch (error) {
        console.error("Error loading cars from localStorage:", error)
        setCars(carsData as Car[]) // Fallback a datos originales
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [])

  // Función para añadir un nuevo vehículo
  const addCar = (newCarData: any) => {
    try {
      // Generar ID único (mayor que los existentes)
      const maxId = Math.max(...cars.map(car => car.id), 0)
      const id = maxId + 1
      
      const newCar: Car = {
        id,
        vehicle: newCarData.vehicle,
        brand: newCarData.brand,
        model: newCarData.model || "",
        year: parseInt(newCarData.year),
        price: parseInt(newCarData.price),
        originalPrice: newCarData.originalPrice ? parseInt(newCarData.originalPrice) : undefined,
        kms: parseInt(newCarData.kms),
        plate: newCarData.plate,
        status: newCarData.status,
        etiq: newCarData.etiq,
        days: parseInt(newCarData.days) || 0,
        color: newCarData.color || "",
        fuel: newCarData.fuel || "",
        transmission: newCarData.transmission || "",
        doors: parseInt(newCarData.doors) || 4,
        seats: parseInt(newCarData.seats) || 5,
        power: newCarData.power || "",
        consumption: newCarData.consumption || "",
        emissions: newCarData.emissions || "",
        portals: Object.keys(newCarData.portals || {}), // Convertir objeto a array
        portalUrls: newCarData.portals || {},
        image: newCarData.image || "",
        images: newCarData.images || [newCarData.image || ""],
        description: newCarData.description || "",
        features: newCarData.features || [],
        location: newCarData.location || "",
        dealer: newCarData.dealer || {
          name: "",
          phone: "",
          email: "",
          rating: 0,
          reviews: 0
        },
        history: newCarData.history || [],
        maintenance: newCarData.maintenance || []
      }

      // Obtener vehículos actuales del localStorage
      const savedCars = localStorage.getItem(STORAGE_KEY)
      const localCars = savedCars ? JSON.parse(savedCars) : []
      
      // Añadir el nuevo vehículo
      const updatedLocalCars = [...localCars, newCar]
      
      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalCars))
      
      // Actualizar estado
      setCars(prev => [...prev, newCar])
      
      return newCar
    } catch (error) {
      console.error("Error saving car to localStorage:", error)
      throw error
    }
  }

  // Función para actualizar un vehículo
  const updateCar = (id: number, updatedData: Partial<Car>) => {
    try {
      // Verificar si es un vehículo del localStorage (ID mayor que los originales)
      const maxOriginalId = Math.max(...(carsData as Car[]).map(car => car.id))
      
      if (id > maxOriginalId) {
        const savedCars = localStorage.getItem(STORAGE_KEY)
        const localCars = savedCars ? JSON.parse(savedCars) : []
        
        const updatedLocalCars = localCars.map((car: Car) =>
          car.id === id ? { ...car, ...updatedData } : car
        )
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalCars))
      }
      
      // Actualizar estado
      setCars(prev =>
        prev.map(car =>
          car.id === id ? { ...car, ...updatedData } : car
        )
      )
    } catch (error) {
      console.error("Error updating car:", error)
      throw error
    }
  }

  // Función para eliminar un vehículo
  const deleteCar = (id: number) => {
    try {
      // Solo permitir eliminar vehículos del localStorage
      const maxOriginalId = Math.max(...(carsData as Car[]).map(car => car.id))
      
      if (id > maxOriginalId) {
        const savedCars = localStorage.getItem(STORAGE_KEY)
        const localCars = savedCars ? JSON.parse(savedCars) : []
        
        const updatedLocalCars = localCars.filter((car: Car) => car.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLocalCars))
      }
      
      // Actualizar estado
      setCars(prev => prev.filter(car => car.id !== id))
    } catch (error) {
      console.error("Error deleting car:", error)
      throw error
    }
  }

  // Función para obtener un vehículo por ID
  const getCarById = (id: number) => {
    return cars.find(car => car.id === id)
  }

  return {
    cars,
    loading,
    addCar,
    updateCar,
    deleteCar,
    getCarById
  }
}
