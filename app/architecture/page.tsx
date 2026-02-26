'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Brain, Smartphone, ArrowRight, Check } from "lucide-react"
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram"

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Arquitectura del Sistema
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Diseño de 3 capas para máxima escalabilidad, eficiencia y mantenibilidad
        </p>
      </div>

      {/* Visual Diagram */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg border border-border p-6 overflow-auto">
        <ArchitectureDiagram />
      </div>

      {/* Architecture Diagram - 3 Layers */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CAPA 1: Presentación */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge className="bg-red-600 hover:bg-red-700 text-white">CAPA 1</Badge>
            </div>
            <Card className="flex-1 border-2" style={{ borderColor: '#D31219' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-5 w-5" style={{ color: '#D31219' }} />
                  <CardTitle className="text-lg">Presentación</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Framework</p>
                  <Badge variant="outline" className="bg-blue-50">Next.js 16</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">UI Library</p>
                  <Badge variant="outline" className="bg-blue-50">React 19</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Componentes</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Mobile Navigation
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Report Forms
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Task Dashboard
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Admin Panel
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Diseño</p>
                  <Badge variant="outline" className="bg-yellow-50">Mobile-First</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center md:block md:py-8">
            <ArrowRight className="h-8 w-8 text-muted-foreground md:hidden" />
            <div className="hidden md:flex h-full items-center justify-center">
              <div className="w-1 h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent"></div>
            </div>
          </div>

          {/* CAPA 2: Lógica */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white">CAPA 2</Badge>
            </div>
            <Card className="flex-1 border-2" style={{ borderColor: '#B28A12' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5" style={{ color: '#B28A12' }} />
                  <CardTitle className="text-lg">Lógica</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Lenguaje</p>
                  <Badge variant="outline" className="bg-blue-50">TypeScript</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Sistema de Tipos</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Type Safety
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Interfaces Validadas
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">AI Processing</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Priorización Automática
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Análisis de Imágenes
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Asignación Inteligente
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center md:block md:py-8">
            <ArrowRight className="h-8 w-8 text-muted-foreground md:hidden" />
            <div className="hidden md:flex h-full items-center justify-center">
              <div className="w-1 h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent"></div>
            </div>
          </div>

          {/* CAPA 3: Datos */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge className="bg-green-700 hover:bg-green-800 text-white">CAPA 3</Badge>
            </div>
            <Card className="flex-1 border-2" style={{ borderColor: '#2D8A3C' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5" style={{ color: '#2D8A3C' }} />
                  <CardTitle className="text-lg">Datos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Base de Datos</p>
                  <Badge variant="outline" className="bg-green-50">PostgreSQL</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Tablas Principales</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Users
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Reports/Incidents
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Tasks
                    </li>
                    <li className="flex items-center gap-1">
                      <Check className="h-3 w-3" style={{ color: '#2D8A3C' }} />
                      Configuration
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Características</p>
                  <Badge variant="outline" className="bg-green-50">RLS Security</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Flujo de Datos</h2>
        <Card className="p-6">
          <div className="space-y-6">
            {/* Flow Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#D31219' }}>
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Usuario crea reporte</h3>
                <p className="text-sm text-muted-foreground">Estudiante o personal proporciona imagen, descripción y ubicación</p>
              </div>
            </div>

            <div className="pl-4 border-l-2 border-muted"></div>

            {/* Flow Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#B28A12' }}>
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">IA procesa información</h3>
                <p className="text-sm text-muted-foreground">Análisis de imagen, extracción de características, clasificación automática</p>
              </div>
            </div>

            <div className="pl-4 border-l-2 border-muted"></div>

            {/* Flow Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#2D8A3C' }}>
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Almacenamiento en BD</h3>
                <p className="text-sm text-muted-foreground">Registro con prioridad, asignación, tags e impacto calculados por IA</p>
              </div>
            </div>

            <div className="pl-4 border-l-2 border-muted"></div>

            {/* Flow Step 4 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#D31219' }}>
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Asignación y notificación</h3>
                <p className="text-sm text-muted-foreground">Coordinador recibe tarea en su dashboard con toda la información</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key Technologies */}
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Tecnologías Clave</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Frontend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Next.js 16 App Router</p>
              <p>React 19 con Suspense</p>
              <p>TypeScript para type safety</p>
              <p>Tailwind CSS responsive</p>
              <p>Shadcn/ui components</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Backend & IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Server Actions (Next.js)</p>
              <p>AI Gateway (Image Analysis)</p>
              <p>Algoritmos de priorización</p>
              <p>NLP para clasificación</p>
              <p>Load balancing inteligente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
