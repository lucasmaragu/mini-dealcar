import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
    
      <Sidebar />
      
   
      <main className="flex-1 bg-gray-100 overflow-auto lg:ml-0">
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
