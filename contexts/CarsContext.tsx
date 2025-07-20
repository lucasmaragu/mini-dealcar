"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { useCarsLogic } from '@/hooks/useCars'
import { Car } from "@/lib/types"

interface CarsContextType {
  cars: Car[]
  loading: boolean
  addCar: (newCarData: any) => Car
  updateCar: (id: number, updatedData: Partial<Car>) => void
  deleteCar: (id: number) => void
  getCarById: (id: number) => Car | undefined
  clearUserCars: () => boolean
  refreshCars: () => void
}

const CarsContext = createContext<CarsContextType | undefined>(undefined)

export function CarsProvider({ children }: { children: ReactNode }) {
  // El Context solo proporciona el estado, la lógica está en useCars
  const carsData = useCarsLogic() // Importaremos esto del hook

  return (
    <CarsContext.Provider value={carsData}>
      {children}
    </CarsContext.Provider>
  )
}

// Hook simple que accede al contexto
export function useCarsContext() {
  const context = useContext(CarsContext)
  if (context === undefined) {
    throw new Error('useCarsContext must be used within a CarsProvider')
  }
  return context
}

// Hook que usan los componentes - usa contexto si está disponible, sino lógica directa
export function useCars() {
  const context = useContext(CarsContext)
  
  // Si estamos dentro del Provider, usar el contexto compartido
  if (context !== undefined) {
    return context
  }
  
  // Si no, importar y usar la lógica directamente (fallback)
  const { useCarsLogic } = require('@/hooks/useCars')
  return useCarsLogic()
}