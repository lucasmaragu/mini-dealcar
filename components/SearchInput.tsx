import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SearchInputProps } from '@/lib/types'


export default function SearchInput({ placeholder = 'Buscar...', onSearch }: SearchInputProps) {
    const [query, setQuery] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        onSearch(value)
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-md">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white  text-gray-500  focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </form>
    )
}