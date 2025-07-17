import { Car, LayoutDashboard, Users, Settings, Search, Bell, ChevronDown, Edit, Plus } from "lucide-react"

const sideBarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Car, label: "Cars", active: true },
  { icon: Users, label: "Customers", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export default function Sidebar() {
    return (
        <div className="font-bold text-black">
            <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-navy ">DealCar Mini</span>
          </div>
        </div>
            <nav className="px-4 space-y-2">
          {sideBarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-2xl text-left transition-colors ${
                item.active ? "bg-brand-blue text-gray-700 font-medium  " : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        </div>
    )

}