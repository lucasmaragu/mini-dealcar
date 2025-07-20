"use client"

import { useState, useEffect } from 'react'
import { cars as carsData } from "@/lib/data"
import { Car } from "@/lib/types"

const STORAGE_KEY = "dealcar_vehicles"

export function useCarsLogic() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  // Función para cargar cars
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

  // Cargar datos al inicializar
  useEffect(() => {
    loadCars()
  }, [])

  // Función para refrescar los cars (útil para forzar actualización)
  const refreshCars = () => {
    loadCars()
  }

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
        portals: newCarData.portals || [],
        portalUrls: newCarData.portalUrls || {},
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
      
      console.log(newCar)
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

  // Función para limpiar todos los vehículos del localStorage
  const clearUserCars = () => {
    try {
      // Eliminar todos los vehículos del localStorage
      localStorage.removeItem(STORAGE_KEY)
      
      // Actualizar estado solo con los vehículos originales
      setCars(carsData as Car[])
      
      return true
    } catch (error) {
      console.error("Error clearing user cars:", error)
      throw error
    }
  }

  return {
    cars,
    loading,
    addCar,
    updateCar,
    deleteCar,
    getCarById,
    clearUserCars,
    refreshCars
  }
}

// Hook principal que usan los componentes cuando NO están dentro del Provider
export function useCars() {
  // Fallback que ejecuta la lógica directamente
  // En la práctica, los componentes dentro del dashboard siempre tendrán el Provider
  return useCarsLogic()
}