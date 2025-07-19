"use client"

import SearchInput from '@/components/SearchInput'
import { useState } from 'react'

const cars = ['Audi', 'BMW', 'Ford', 'Tesla', 'Toyota']

export default function DashboardPage()
{

const [filtered, setFiltered] = useState(cars)

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase()
    const result = cars.filter((car) => car.toLowerCase().includes(lower))
    setFiltered(result)
  }
  
 return (
    <div className="p-4">
      <SearchInput onSearch={handleSearch} />
      <ul className="mt-4 space-y-1">
        {filtered.map((car, i) => (
          <li key={i}>{car}</li>
        ))}
      </ul>
    </div>
 )

}