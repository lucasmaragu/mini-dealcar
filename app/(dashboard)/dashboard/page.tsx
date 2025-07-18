'use client'

import SearchInput from '@/components/SearchInput'
import { useState } from 'react'

const cars = ['Audi', 'BMW', 'Ford', 'Tesla', 'Toyota']

export default function CarPage({})
{

const [filtered, setFiltered] = useState(cars)

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase()
    const result = cars.filter((car) => car.toLowerCase().includes(lower))
    setFiltered(result)
  }
  
 return (
    <div className="p-4">
      <div className="flex justify-between">
      <SearchInput onSearch={handleSearch} />
      <button className="px-4 py-2 bg-brand-navy cursor-pointer rounded-xl">
        + Add Vehicle
      </button>
      </div>
    </div>
 )

}