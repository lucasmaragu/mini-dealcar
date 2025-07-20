"use client"

import { useState, useEffect } from "react"
import { Search, Shield, Zap, Menu, X, ChevronRight, Play, Car } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

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
    <div className="h-screen bg-white font-body overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-900 text-white px-4 py-2 rounded-md z-50"
      >
        Saltar al contenido principal
      </a>

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

           

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105">
                Acceder
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-2"
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú de navegación"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border border-neutral-200 rounded-lg mt-2 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["Inicio", "Vehículos", "Servicios", "Contacto"].map((item) => (
                  <button
                    key={item}
                    className="text-neutral-600 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
                  >
                    {item}
                  </button>
                ))}
                <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  Acceder
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content - Full Screen Hero */}
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
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
              {/* Content */}
              <div className="animate-fade-in flex flex-col justify-center">
                <h1
                  id="hero-heading"
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 leading-tight mb-6"
                >
                  Encuentra tu próximo{" "}
                  <span className="text-brand-navy bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                    vehículo
                  </span>{" "}
                  de forma inteligente
                </h1>
                <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-2xl mb-10">
                  <strong>DealCar Mini </strong> conecta compradores y vendedores con tecnología avanzada y experiencia simplificada.
                  Descubre una nueva forma de encontrar el vehículo perfecto.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                  <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105 flex items-center justify-center">
                    Explorar Vehículos
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => router.push(`/cars`)}
                  className=" border-2 text-gray-200 border-white hover:border-neutral-300 hover:border-primary-600 bg-brand-navy hover:bg-white hover:text-neutral-700 hover:text-primary-600 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-200  flex items-center justify-center cursor-pointer">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110   transition-transform" />
                    Ver Demo
                  </button>
                </div>
              </div>

              {/* Interface Mockup */}
              <div className="animate-slide-up lg:animate-float flex items-center justify-center">
                <div className="relative max-w-lg w-full">
                  {/* Main Interface Card */}
                  <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-neutral-500 font-mono">dealcar-mini.app</span>
                    </div>

                    {/* Search Interface */}
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Buscar vehículo..."
                          className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          readOnly
                        />
                      </div>

                      {/* Filter Pills */}
                      <div className="flex flex-wrap gap-2">
                        {["Audi", "2020-2023", "< 50k km", "Automático"].map((filter, index) => (
                          <span
                            key={filter}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium animate-pulse-soft"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            {filter}
                          </span>
                        ))}
                      </div>

                      {/* Results Preview */}
                      <div className="space-y-3 pt-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                            <div className="w-12 h-8 bg-gradient-to-r from-neutral-300 to-neutral-400 rounded"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-neutral-300 rounded w-3/4 mb-1"></div>
                              <div className="h-2 bg-neutral-200 rounded w-1/2"></div>
                            </div>
                            <div className="text-primary-600 font-semibold">
                              €{(25000 + item * 5000).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-accent-500 text-white p-3 rounded-xl shadow-lg animate-float">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 bg-primary-600 text-white p-3 rounded-xl shadow-lg animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <Zap className="h-6 w-6" />
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
