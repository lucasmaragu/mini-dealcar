import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { SimpleDropdownProps } from "@/lib/types"


export default function SimpleDropdown({ label, options, selected, onSelect, placeholder }: SimpleDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const isDefaultSelected = selected === "Todos" || selected === "Todas"

  return (
    <div ref={ref} className="relative inline-block text-left min-w-[120px]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex justify-between items-center w-full border rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 ${
          isDefaultSelected
            ? "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 focus:ring-gray-300"
            : "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-300"
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{label}:</span>
          <span className={`${isDefaultSelected ? "text-gray-600" : "text-blue-700"} font-medium`}>
            {selected}
          </span>
        </div>
        <ChevronDown 
          className={`w-3 h-3 ml-1 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${isDefaultSelected ? "text-gray-400" : "text-blue-500"}`} 
        />
      </button>

      {open && (
        <div className="absolute mt-1 w-full min-w-[160px] rounded-lg shadow-lg bg-white border border-gray-100 z-50 overflow-hidden">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => {
              const isSelected = selected === option
              const isDefault = option === "Todos" || option === "Todas"
              
              return (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors duration-150 ${
                    isSelected
                      ? isDefault
                        ? "bg-gray-50 text-gray-700"
                        : "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className={`${isSelected && !isDefault ? "font-medium" : ""}`}>
                    {option}
                  </span>
                  {isSelected && (
                    <Check className={`w-3 h-3 ${isDefault ? "text-gray-500" : "text-blue-500"}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
