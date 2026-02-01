import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Bell, 
  FileText, 
  MapPin, 
  Camera, 
  Settings,
  User,
  Home,
  Search,
  Plus,
  ChevronRight,
  Clock,
  Building2
} from "lucide-react"

export function IconSystem() {
  return (
    <div className="space-y-8">
      {/* Tamaños de iconos */}
      <div className="space-y-4">
        <h3>Tamaños de Iconos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-lg border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-3">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <p className="font-semibold text-foreground">Icono Estándar</p>
            <p className="text-caption text-muted-foreground">24px × 24px</p>
            <p className="text-caption text-muted-foreground mt-1">Navegación y botones</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-muted rounded-lg mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">Icono de Soporte</p>
            <p className="text-caption text-muted-foreground">16px × 16px</p>
            <p className="text-caption text-muted-foreground mt-1">Detalles y metadatos</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg border-2 border-dashed border-primary mb-3">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Área Táctil</p>
            <p className="text-caption text-muted-foreground">48px × 48px mínimo</p>
            <p className="text-caption text-muted-foreground mt-1">Iconos interactivos</p>
          </div>
        </div>
      </div>

      {/* Iconos de navegación */}
      <div className="space-y-4">
        <h3>Iconos de Navegación</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { icon: Home, label: "Inicio" },
            { icon: FileText, label: "Reportes" },
            { icon: Bell, label: "Notificaciones" },
            { icon: User, label: "Perfil" },
            { icon: Settings, label: "Configuración" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center p-3 bg-card rounded-lg border border-border min-w-[80px]">
              <div className="w-12 h-12 flex items-center justify-center">
                <Icon className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-caption text-muted-foreground mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Iconos de estado */}
      <div className="space-y-4">
        <h3>Iconos de Estado Semántico</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg border status-success">
            <CheckCircle2 className="h-6 w-6" />
            <div>
              <p className="font-semibold">Éxito</p>
              <p className="text-caption">Reporte finalizado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg border status-warning">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <p className="font-semibold">Alerta</p>
              <p className="text-caption">En revisión</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg border status-error">
            <XCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-caption">Incidencia crítica</p>
            </div>
          </div>
        </div>
      </div>

      {/* Iconos de acción */}
      <div className="space-y-4">
        <h3>Iconos de Acción</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { icon: Plus, label: "Añadir" },
            { icon: Search, label: "Buscar" },
            { icon: Camera, label: "Cámara" },
            { icon: MapPin, label: "Ubicación" },
            { icon: Building2, label: "Edificio" },
            { icon: ChevronRight, label: "Siguiente" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center p-3 bg-card rounded-lg border border-border min-w-[80px]">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-caption text-muted-foreground mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
