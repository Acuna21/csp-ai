'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, CheckCircle, AlertCircle } from "lucide-react"

export default function RequirementsPage() {
  const stakeholders = [
    {
      group: "Estudiantes",
      icon: Users,
      needs: ["Reportar incidencias rápidamente", "Seguimiento en tiempo real", "Comunicación clara del estado"],
      color: "bg-blue-100 text-blue-900"
    },
    {
      group: "Coordinadores",
      icon: Target,
      needs: ["Asignación automática optimizada", "Información completa del incidente", "Herramientas de colaboración"],
      color: "bg-red-100 text-red-900"
    },
    {
      group: "Administradores",
      icon: CheckCircle,
      needs: ["Control total del sistema", "Configuración flexible", "Reportes y análisis"],
      color: "bg-green-100 text-green-900"
    },
    {
      group: "Jefes de Área",
      icon: AlertCircle,
      needs: ["Supervisión de incidencias", "Métricas de desempeño", "Validación de resoluciones"],
      color: "bg-yellow-100 text-yellow-900"
    }
  ]

  const requirements = [
    { type: "Funcional", category: "Sistema Inteligente", description: "IA para priorización automática y asignación optimizada", priority: "CRÍTICA" },
    { type: "Funcional", category: "Reporte por Imagen", description: "Análisis de foto + descripción para clasificación automática", priority: "ALTA" },
    { type: "Funcional", category: "Panel Admin", description: "Gestión dinámica de parámetros del sistema", priority: "ALTA" },
    { type: "No Funcional", category: "Performance", description: "Carga < 2s en móvil, respuesta API < 500ms", priority: "MEDIA" },
    { type: "No Funcional", category: "Usabilidad Móvil", description: "Interfaz optimizada para dispositivos móviles", priority: "ALTA" },
    { type: "No Funcional", category: "Seguridad", description: "Autenticación y RLS en base de datos", priority: "CRÍTICA" }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Análisis de Requerimientos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Toma de requerimientos basada en análisis de stakeholders y necesidades del negocio
        </p>
      </div>

      {/* Stakeholders */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Análisis de Stakeholders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {stakeholders.map((stakeholder) => {
            const Icon = stakeholder.icon
            return (
              <Card key={stakeholder.group} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${stakeholder.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{stakeholder.group}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stakeholder.needs.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Requirements Matrix */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Matriz de Requerimientos</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tipo</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Categoría</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Descripción</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{req.type}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{req.category}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{req.description}</td>
                  <td className="px-4 py-3">
                    <Badge 
                      className={`text-xs font-semibold px-3 py-1 ${
                        req.priority === "CRÍTICA" ? "bg-red-100 text-red-800" :
                        req.priority === "ALTA" ? "bg-orange-100 text-orange-800" :
                        "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {req.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <Card className="border-2" style={{ borderColor: "#D31219" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6" style={{ color: "#D31219" }} />
            Hallazgos Clave
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-bold text-foreground">4 Grupos Stakeholder</p>
              <p className="text-sm text-muted-foreground">Cada uno con necesidades distintas</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-bold text-foreground">2 Requerimientos Críticos</p>
              <p className="text-sm text-muted-foreground">IA inteligente y seguridad del sistema</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-bold text-foreground">100% Móvil First</p>
              <p className="text-sm text-muted-foreground">Diseño optimizado para dispositivos móviles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
