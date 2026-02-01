import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Clock, MapPin, ChevronRight } from "lucide-react"

export function CardExamples() {
  return (
    <div className="space-y-8">
      {/* Cards de Reporte */}
      <div className="space-y-4">
        <h3>Cards de Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Reporte Crítico */}
          <Card className="border-l-4" style={{ borderLeftColor: '#D31219' }}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Badge variant="destructive" className="text-xs">
                  CRÍTICO
                </Badge>
                <span className="text-caption text-muted-foreground">ID: 1234</span>
              </div>
              <CardTitle className="text-lg mt-2">Fuga de agua en baños</CardTitle>
              <CardDescription className="flex items-center gap-1 text-caption">
                <MapPin className="h-4 w-4" />
                Edificio A, Piso 2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-m text-muted-foreground line-clamp-2">
                Se detectó una fuga considerable en los baños del segundo piso que requiere atención inmediata.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="flex items-center gap-1 text-caption text-muted-foreground">
                <Clock className="h-4 w-4" />
                Hace 2 horas
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver detalles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          {/* Reporte en Revisión */}
          <Card className="border-l-4" style={{ borderLeftColor: '#B28A12' }}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Badge className="text-xs" style={{ backgroundColor: '#B28A12', color: '#FFFFFF' }}>
                  EN REVISION
                </Badge>
                <span className="text-caption text-muted-foreground">ID: 1235</span>
              </div>
              <CardTitle className="text-lg mt-2">Iluminación deficiente</CardTitle>
              <CardDescription className="flex items-center gap-1 text-caption">
                <MapPin className="h-4 w-4" />
                Biblioteca Central
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-m text-muted-foreground line-clamp-2">
                Varias lámparas de la sala de lectura principal no están funcionando correctamente.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="flex items-center gap-1 text-caption text-muted-foreground">
                <Clock className="h-4 w-4" />
                Hace 1 día
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver detalles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>

          {/* Reporte Resuelto */}
          <Card className="border-l-4" style={{ borderLeftColor: '#2D8A3C' }}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Badge className="text-xs" style={{ backgroundColor: '#2D8A3C', color: '#FFFFFF' }}>
                  RESUELTO
                </Badge>
                <span className="text-caption text-muted-foreground">ID: 1230</span>
              </div>
              <CardTitle className="text-lg mt-2">Aire acondicionado</CardTitle>
              <CardDescription className="flex items-center gap-1 text-caption">
                <MapPin className="h-4 w-4" />
                Auditorio Principal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-m text-muted-foreground line-clamp-2">
                El sistema de climatización ha sido reparado y está funcionando correctamente.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="flex items-center gap-1 text-caption text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" style={{ color: '#2D8A3C' }} />
                Resuelto hace 3 días
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                Ver detalles
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Card de Alerta */}
      <div className="space-y-4">
        <h3>Card de Alerta/Notificación</h3>
        <div className="max-w-md">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-base">Incidencia Crítica Reportada</CardTitle>
                  <CardDescription className="text-caption">
                    Hace 5 minutos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-body-m text-foreground">
                Se ha reportado una fuga de agua en el Edificio A que requiere atención inmediata.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">
                Revisar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                Descartar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Especificaciones de Card */}
      <div className="space-y-4">
        <h3>Especificaciones de Imágenes en Cards</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Dispositivo</th>
                <th className="text-left py-3 px-4 font-semibold">Aspect Ratio</th>
                <th className="text-left py-3 px-4 font-semibold">Uso</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Mobile</td>
                <td className="py-3 px-4 font-mono text-primary">1:1 o 4:3</td>
                <td className="py-3 px-4 text-muted-foreground">Prioriza espacio vertical</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Tablet/Web</td>
                <td className="py-3 px-4 font-mono text-primary">16:9</td>
                <td className="py-3 px-4 text-muted-foreground">Banners y cabeceras</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Miniaturas</td>
                <td className="py-3 px-4 font-mono text-primary">80px × 80px</td>
                <td className="py-3 px-4 text-muted-foreground">border-radius: 8px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
