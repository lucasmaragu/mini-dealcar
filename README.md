# 🚗 DealCar Mini

**Una aplicación web moderna para la gestión inteligente de vehículos**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Descripción del Proyecto

**DealCar Mini** es una aplicación web desarrollada como demostración técnica para DealCar, implementando un sistema completo de gestión de vehículos con las tecnologías más modernas del ecosistema React/Next.js.

La aplicación permite a los usuarios explorar, agregar y gestionar vehículos de manera intuitiva, con una interfaz moderna y completamente responsive.

---

## ✨ Características Principales

### 🎯 **Funcionalidades Core**
- **Gestión completa de vehículos** (CRUD operations)
- **Búsqueda avanzada** con filtros múltiples
- **Persistencia local** con localStorage
- **Navegación intuitiva** con rutas dinámicas

### 🎨 **Experiencia de Usuario**
- **Diseño responsive** optimizado para todos los dispositivos
- **Interfaz moderna** con componentes reutilizables
- **Animaciones suaves** y transiciones fluidas
- **Estados de carga** y feedback visual


### 🔧 **Características Técnicas**
- **Arquitectura modular** con separación de responsabilidades
- **Context API** para gestión de estado global
- **Custom hooks** para lógica reutilizable
- **TypeScript estricto** para type safety
- **Componentes tipados** con interfaces claras
- **Optimización de rendimiento** con React best practices

---

## 🛠️ Stack Tecnológico

### **Frontend Framework**
- **Next.js 15** - Framework React con App Router
- **React 18** - Biblioteca de UI con hooks modernos
- **TypeScript** - Tipado estático para mejor desarrollo

### **Styling & UI**
- **Tailwind CSS** - Framework de utilidades CSS
- **Lucide React** - Iconografía moderna y consistente
- **CSS Custom Properties** - Variables para theming

### **Estado y Datos**
- **React Context API** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable encapsulada
- **localStorage** - Persistencia local de datos


---

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18.0 o superior
- npm, yarn, pnpm o bun

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/lucasmaragu/mini-dealcar.git

# Navegar al directorio
cd mini-dealcar

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### **Desarrollo**

```bash
# Ejecutar servidor de desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev

# La aplicación estará disponible en http://localhost:3000
```

### **Construcción para Producción**

```bash
# Generar build optimizado
npm run build

# Ejecutar build en producción
npm start
```

---

## 📱 Características Responsive

### **Breakpoints Optimizados**
- **Mobile First** - Diseño optimizado desde 320px
- **Tablet** - Adaptación fluida para 768px+
- **Desktop** - Experiencia completa para 1024px+
- **Large Screens** - Aprovechamiento de pantallas 1440px+

### **Componentes Adaptativos**
- Header con menú hamburguesa en móvil
- Grids responsivos que se adaptan al contenido
- Modales centrados y optimizados por dispositivo
- Formularios con layouts flexibles

---

## 🏗️ Arquitectura del Proyecto

```
mini-dealcar/
├── app/                          # App Router (Next.js 15)
│   ├── (dashboard)/              # Grupo de rutas protegidas
│   │   ├── cars/                 # Gestión de vehículos
│   │   ├── dashboard/            # Panel principal
│   │   └── layout.tsx            # Layout del dashboard
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout raíz
│   └── page.tsx                  # Landing page
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes base UI
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── ...
├── contexts/                     # Context providers
│   └── CarsContext.tsx
├── hooks/                        # Custom hooks
│   └── useCars.ts
├── lib/                          # Utilidades y tipos
│   ├── data.ts                   # Datos de ejemplo
│   ├── types.ts                  # Definiciones TypeScript
│   └── utils.ts                  # Funciones utilitarias
└── public/                       # Archivos estáticos
```

---

## 🎯 Funcionalidades Implementadas

### **Landing Page**
- Hero section con call-to-action
- Interfaz demo interactiva
- Diseño completamente responsive
- Navegación fluida entre secciones

### **Dashboard de Vehículos**
- Lista completa de vehículos con información detallada
- Sistema de filtros avanzados (marca, estado, etiqueta)
- Búsqueda en tiempo real
- Cards responsivas con información clave

### **Gestión de Vehículos**
- ✅ **Crear** - Formulario completo para nuevos vehículos
- ✅ **Leer** - Vista detallada de cada vehículo
- ✅ **Eliminar** - Confirmación modal para borrado seguro

### **Características Avanzadas**
- Estado global con Context API
- Persistencia en localStorage
- Validación de formularios
- Estados de carga y error
- Confirmaciones de acciones críticas

---

## 🎨 Diseño y UX

### **Paleta de Colores**
- **Primary**: `#0C1541` (Brand Navy)
- **Secondary**: `#F8FAFC` (Brand Light)  
- **Accent**: `#E6F4FE` (Brand Blue)
- **Text**: Escalas de grises optimizadas

### **Tipografía**
- **Font Family**: Inter (Google Fonts)
- **Weights**: 100-900 para máxima flexibilidad
- **Optimización**: Font display swap

### **Componentes UI**
- **Badges** con variantes semánticas
- **Buttons** con estados y animaciones
- **Modals** centrados y accesibles
- **Forms** con validación visual


## 👨‍💻 Desarrollado por

**Lucas Martínez**
- 🌐 [Portfolio](https://lucasmaragu.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/lucasmartinezaguilera/)
- 🐙 [GitHub](https://github.com/lucasmaragu)

---

## 🎯 Contexto del Proyecto

Esta aplicación fue desarrollada como **demostración técnica** para el proceso de selección en **DealCar**, implementando todas las tecnologías y mejores prácticas requeridas:

### **Requisitos Cumplidos** ✅
- ✅ Next.js 15 con App Router
- ✅ React 18 con hooks modernos  
- ✅ TypeScript para type safety
- ✅ Tailwind CSS para styling
- ✅ Responsive design completo
- ✅ Gestión de estado con Context API
- ✅ Custom hooks reutilizables
- ✅ Componentes modulares
- ✅ Arquitectura escalable

### **Valor Añadido** 🌟
- 🎨 Diseño UX/UI profesional
- ⚡ Optimización de rendimiento
- 📱 Mobile-first responsive
- 🔒 Prácticas de seguridad
- 🧪 Código mantenible y testeable

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🤝 Contribuciones

Las contribuciones, issues y feature requests son bienvenidas. No dudes en contactar para cualquier consulta sobre el proyecto.

---

**⚡ Desarrollado con pasión para demostrar excelencia técnica en el ecosistema React/Next.js**
