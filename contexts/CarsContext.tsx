"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { useCarsLogic } from '@/hooks/useCars'
import { Car, CarsContextType } from "@/lib/types"



const CarsContext = createContext<CarsContextType | undefined>(undefined)

export function CarsProvider({ children }: { children: ReactNode }) {
  const carsData = useCarsLogic() 

  return (
    <CarsContext.Provider value={carsData}>
      {children}
    </CarsContext.Provider>
  )
}

export function useCarsContext() {
  const context = useContext(CarsContext)
  if (context === undefined) {
    throw new Error('useCarsContext must be used within a CarsProvider')
  }
  return context
}

export function useCars() {
  const context = useContext(CarsContext)
  
  if (context !== undefined) {
    return context
  }
  
  const { useCarsLogic } = require('@/hooks/useCars')
  return useCarsLogic()
}