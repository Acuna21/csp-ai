import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, MapPin, Users, Tag, AlertCircle, Settings } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Sitios/Lugares', count: 12, icon: MapPin, color: '#D31219' },
    { label: 'Áreas', count: 8, icon: BarChart3, color: '#B28A12' },
    { label: 'Trabajadores', count: 45, icon: Users, color: '#2D8A3C' },
    { label: 'Tags', count: 23, icon: Tag, color: '#6B7280' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">Gestiona la configuración del sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.count}</p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración Rápida</CardTitle>
          <CardDescription>Accede a las opciones de configuración más comunes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Usa el menú lateral para acceder a todas las opciones de configuración del sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
