'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, BarChart3, Users, Tag, AlertCircle, Settings, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/locations', label: 'Sitios/Lugares', icon: MapPin },
  { href: '/admin/areas', label: 'Áreas', icon: BarChart3 },
  { href: '/admin/workers', label: 'Trabajadores', icon: Users },
  { href: '/admin/area-heads', label: 'Jefes de Áreas', icon: Users },
  { href: '/admin/tags', label: 'Tags', icon: Tag },
  { href: '/admin/criticality', label: 'Criticidad', icon: AlertCircle },
  { href: '/admin/task-states', label: 'Estados de Tareas', icon: Settings },
  { href: '/admin/weights', label: 'Pesos de Incidencias', icon: BarChart3 },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-secondary border-r border-border hidden md:block">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Admin</h2>
        <p className="text-sm text-muted-foreground">Configuración del Sistema</p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3 text-muted-foreground',
                  isActive && 'bg-primary text-primary-foreground hover:bg-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
