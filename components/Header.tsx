import { Bell, LogOut } from 'lucide-react'

export default function Header() {
 return (

    <div className="flex justify-between bg-white p-5 text-black">

        <div className="py-1 text-2xl text-brand-navy font-bold">
         Cars
        </div>
        <div>
            <div className="flex gap-x-10">
                <div className="py-1 cursor-pointer">
                <Bell />
                </div>
                <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-700 text-white hover:bg-red-700 transition-colors cursor-pointer">
                    <LogOut size={18}/>
                    <span className="font-bold">Logout</span>
                </button>
            </div>
        </div>
    </div>
 )

}