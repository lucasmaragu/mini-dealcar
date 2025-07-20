"use client"

import { useState, useEffect } from "react"
import { Search, Shield, Zap, Menu, X, ChevronRight, Play, Car } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white font-body overflow-hidden">



      {/* Header */}
      <header className="absolute top-0 w-full z-40 bg-transparent">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navegación principal">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-brand-navy">DealCar Mini</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content*/}
      <main id="main-content" className="h-full flex items-center">
        {/* Hero Section */}
        <section className="relative w-full h-full flex items-center overflow-hidden" aria-labelledby="hero-heading">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" className="text-primary-200" />
              </svg>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
              {/* Content */}
              <div className="animate-fade-in flex flex-col justify-center text-center lg:text-left">
                <h1
                  id="hero-heading"
                  className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 leading-tight mb-4 lg:mb-6"
                >
                  Encuentra tu próximo{" "}
                  <span className="text-brand-navy bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                    vehículo
                  </span>{" "}
                  <span className="block lg:inline">de forma inteligente</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-2xl mb-8 lg:mb-10 mx-auto lg:mx-0">
                  <strong>DealCar Mini </strong> conecta compradores y vendedores con tecnología avanzada y experiencia simplificada.
                  Descubre una nueva forma de encontrar el vehículo perfecto.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0">
                  
                  <button
                    onClick={() => router.push(`/cars`)}
                    className="group border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 flex items-center justify-center cursor-pointer"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Ver Demo
                  </button>
                </div>
              </div>

         
              <div className="mt-15 lg:mt-0 animate-slide-up lg:animate-float flex items-center justify-center order-first lg:order-last">
                <div className="relative max-w-sm sm:max-w-md lg:max-w-lg w-full">
               
                  <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 sm:p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-neutral-500 font-mono">dealcar-mini.app</span>
                    </div>

              
                    <div className="space-y-3 sm:space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Buscar vehículo..."
                          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border text-gray-600 border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                          readOnly
                        />
                      </div>

                
                      <div className="flex text-gray-600 flex-wrap gap-1.5 sm:gap-2">
                        {["Audi", "2020-2023", "< 50k km", "Automático"].map((filter, index) => (
                          <span
                            key={filter}
                            className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium animate-pulse-soft"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            {filter}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-gray-400 sm:space-y-3 pt-2 sm:pt-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-neutral-50 rounded-lg">
                            <div className="w-10 h-6 sm:w-12 sm:h-8 bg-gradient-to-r from-neutral-300 to-neutral-400 rounded"></div>
                            <div className="flex-1">
                              <div className="h-2.5 sm:h-3 bg-neutral-300 rounded w-3/4 mb-1"></div>
                              <div className="h-1.5 sm:h-2 bg-neutral-200 rounded w-1/2"></div>
                            </div>
                            <div className="text-primary-600 font-semibold text-sm sm:text-base">
                              €{(25000 + item * 5000).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

              
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-accent-500 text-white p-2 sm:p-3 rounded-xl shadow-lg animate-float">
                    <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                  <div
                    className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-primary-600 text-white p-2 sm:p-3 rounded-xl shadow-lg animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
