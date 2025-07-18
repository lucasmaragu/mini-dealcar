import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white text-white p-4">
        <Sidebar />
      </aside>
      
      <main className="flex-1 bg-gray-100 overflow-auto">
        
     
        
       <div className="flex-1 ">
        {children}
        </div>
      </main>
    </div>
  )
}
