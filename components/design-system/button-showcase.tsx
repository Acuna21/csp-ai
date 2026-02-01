import { Button } from "@/components/ui/button"
import { AlertCircle, Send, Plus, ChevronRight } from "lucide-react"

export function ButtonShowcase() {
  return (
    <div className="space-y-8">
      {/* Matriz técnica */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Variante</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Texto</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground hidden sm:table-cell">Padding Y</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground hidden md:table-cell">Padding X</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Peso</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-primary">XL (Hero)</td>
              <td className="py-3 px-4">18px</td>
              <td className="py-3 px-4 hidden sm:table-cell">18px</td>
              <td className="py-3 px-4 hidden md:table-cell">32px</td>
              <td className="py-3 px-4">600</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-primary">LG (Standard)</td>
              <td className="py-3 px-4">16px</td>
              <td className="py-3 px-4 hidden sm:table-cell">14px</td>
              <td className="py-3 px-4 hidden md:table-cell">24px</td>
              <td className="py-3 px-4">600</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-primary">MD (Compact)</td>
              <td className="py-3 px-4">14px</td>
              <td className="py-3 px-4 hidden sm:table-cell">10px</td>
              <td className="py-3 px-4 hidden md:table-cell">20px</td>
              <td className="py-3 px-4">500</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 font-mono text-primary">SM (Inline)</td>
              <td className="py-3 px-4">12px</td>
              <td className="py-3 px-4 hidden sm:table-cell">6px</td>
              <td className="py-3 px-4 hidden md:table-cell">12px</td>
              <td className="py-3 px-4">500</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ejemplos de botones */}
      <div className="space-y-6">
        {/* Botones Primarios */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Botones Primarios (Rojo Institucional)</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="lg" className="h-[54px] px-8 text-lg font-semibold">
              <Send className="mr-2 h-5 w-5" />
              Reportar Incidencia
            </Button>
            <Button size="default" className="font-semibold">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Reporte
            </Button>
            <Button size="sm" className="font-medium">
              Ver más
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Botones Secundarios */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Botones Secundarios (Negro)</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="secondary" size="lg" className="h-[54px] px-8 text-lg font-semibold">
              Configuración
            </Button>
            <Button variant="secondary" size="default" className="font-semibold">
              Cancelar
            </Button>
            <Button variant="secondary" size="sm" className="font-medium">
              Atrás
            </Button>
          </div>
        </div>

        {/* Botones Outline */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Botones Outline</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="outline" size="lg" className="h-[54px] px-8 text-lg font-semibold bg-transparent">
              Ver Detalles
            </Button>
            <Button variant="outline" size="default" className="font-semibold bg-transparent">
              Editar
            </Button>
            <Button variant="outline" size="sm" className="font-medium bg-transparent">
              Filtrar
            </Button>
          </div>
        </div>

        {/* Botones Destructivos */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Botones Destructivos (Error)</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="destructive" size="default" className="font-semibold">
              <AlertCircle className="mr-2 h-4 w-4" />
              Eliminar Reporte
            </Button>
            <Button variant="destructive" size="sm" className="font-medium">
              Cancelar
            </Button>
          </div>
        </div>

        {/* Comportamiento Responsive */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Comportamiento Responsive</h3>
          <p className="text-body-m text-muted-foreground">
            En móvil: Full Width (100%). En desktop: Ancho automático con max-width: 320px.
          </p>
          <div className="max-w-md">
            <Button size="lg" className="w-full md:w-auto md:max-w-[320px] h-12 font-semibold">
              <Send className="mr-2 h-5 w-5" />
              Enviar Reporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
