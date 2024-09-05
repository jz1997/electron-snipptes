import ContentTab from '@renderer/components/config/ContentTab'
import Confirm from '@renderer/components/Confirm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Toaster } from '@renderer/components/ui/toaster'
import { cn } from '@renderer/utils/utils'
import { NavLink, Outlet } from 'react-router-dom'

// Config Page
export default function Config() {
  return (
    <div className="w-screen h-screen bg-white p-4 flex flex-col">
      <div className="flex flex-row items-center bg-gray-100 p-1 rounded-lg text-sm text-gray-500">
        <NavLink
          className={({ isActive }) => {
            return cn('cursor-pointer px-2 py-1 rounded-md', isActive ? 'bg-white' : '')
          }}
          to="/config/content"
        >
          内容
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return cn('cursor-pointer px-2 py-1 rounded-md', isActive ? 'bg-white' : '')
          }}
          to="/config/shortcut"
        >
          快捷键
        </NavLink>
      </div>
      <div className="w-full mt-2 border flex-1 p-2 rounded-md h-0">
        <Outlet />
      </div>

      {/* Toaster */}
      <Toaster />
      {/* Confirm */}
      <Confirm />
    </div>
  )
}
