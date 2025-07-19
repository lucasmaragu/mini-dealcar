import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Responsive */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto lg:ml-0">
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
