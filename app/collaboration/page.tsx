'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Clock, CheckCircle2, ArrowRight } from "lucide-react"

export default function CollaborationPage() {
  const softTechnologies = [
    {
      name: "Comunicación en Tiempo Real",
      icon: MessageSquare,
      description: "Notificaciones instantáneas y actualizaciones de estado",
      features: ["Push notifications", "Estado en vivo", "Comentarios en incidencias", "Historial de cambios"]
    },
    {
      name: "Trabajo en Equipo",
      icon: Users,
      description: "Coordinación y colaboración entre responsables",
      features: ["Asignación inteligente", "Subtareas compartidas", "Responsables múltiples", "Escalamiento automático"]
    },
    {
      name: "Transparencia Procesal",
      icon: Clock,
      description: "Visibilidad total del proceso de resolución",
      features: ["Timeline de cambios", "Auditoría completa", "Rastreo de progreso", "Métricas en tiempo real"]
    },
    {
      name: "Retroalimentación Continua",
      icon: CheckCircle2,
      description: "Validación y cierre de incidencias con feedback",
      features: ["Encuestas de satisfacción", "Comentarios de usuarios", "Validación de soluciones", "Mejora continua"]
    }
  ]

  const collaborationFlow = [
    {
      step: 1,
      title: "Reporte Inicial",
      description: "Estudiante reporta incidencia con imagen/descripción",
      actor: "Estudiante",
      duration: "< 2 minutos"
    },
    {
      step: 2,
      title: "Análisis IA",
      description: "Sistema analiza clasificación automática y prioridad",
      actor: "Sistema Inteligente",
      duration: "Instantáneo"
    },
    {
      step: 3,
      title: "Asignación",
      description: "Coordinador idóneo recibe notificación automática",
      actor: "Sistema",
      duration: "< 30 segundos"
    },
    {
      step: 4,
      title: "Coordinación",
      description: "Equipo colabora en resolución con actualizaciones",
      actor: "Coordinadores",
      duration: "Variable"
    },
    {
      step: 5,
      title: "Cierre",
      description: "Validación y retroalimentación del estudiante",
      actor: "Todos",
      duration: "Inmediato"
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Sistema Inteligente: Comunicación y Colaboración
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cómo el sistema integra tecnologías blandas para optimizar la resolución de incidencias
        </p>
      </div>

      {/* Soft Technologies */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Tecnologías Blandas Implementadas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {softTechnologies.map((tech) => {
            const Icon = tech.icon
            return (
              <Card key={tech.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(211, 18, 25, 0.1)" }}>
                      <Icon className="h-6 w-6" style={{ color: "#D31219" }} />
                    </div>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#B28A12" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Collaboration Flow */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Flujo de Colaboración</h2>
        <div className="space-y-4">
          {collaborationFlow.map((item, idx) => (
            <div key={idx}>
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: "#D31219" }}
                  >
                    {item.step}
                  </div>
                  {idx < collaborationFlow.length - 1 && (
                    <div className="h-12 border-l-2" style={{ borderColor: "#D31219" }} />
                  )}
                </div>
                <Card className="flex-1">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">{item.actor}</Badge>
                          <Badge className="bg-green-100 text-green-800" style={{ backgroundColor: "rgba(45, 138, 60, 0.1)", color: "#2D8A3C" }}>
                            {item.duration}
                          </Badge>
                        </div>
                      </div>
                      {idx < collaborationFlow.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-muted-foreground mt-1 hidden md:block" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <Card className="border-2" style={{ borderColor: "#D31219" }}>
        <CardHeader>
          <CardTitle>Beneficios de la Colaboración Integrada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Para Estudiantes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Reporte rápido sin complejidad</li>
                <li>✓ Seguimiento transparente</li>
                <li>✓ Tiempos de resolución reducidos</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Para Coordinadores</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Asignación optimizada automática</li>
                <li>✓ Información completa desde el inicio</li>
                <li>✓ Herramientas de colaboración integradas</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Para la Institución</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Métricas de desempeño en vivo</li>
                <li>✓ Mejora continua basada en datos</li>
                <li>✓ Escalabilidad del sistema</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Para Administradores</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Control total de parámetros</li>
                <li>✓ Auditoría completa de cambios</li>
                <li>✓ Configuración flexible según necesidades</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de Implementación Técnica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg border-l-4" style={{ borderColor: "#D31219" }}>
              <h4 className="font-bold text-foreground mb-2">Real-Time Updates</h4>
              <p className="text-sm text-muted-foreground">Server-Sent Events (SSE) para actualizaciones instantáneas sin polling</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border-l-4" style={{ borderColor: "#B28A12" }}>
              <h4 className="font-bold text-foreground mb-2">Notification System</h4>
              <p className="text-sm text-muted-foreground">Sistema de notificaciones inteligentes con preferencias por usuario</p>
            </div>
            <div className="p-4 bg-muted rounded-lg border-l-4" style={{ borderColor: "#2D8A3C" }}>
              <h4 className="font-bold text-foreground mb-2">Activity Timeline</h4>
              <p className="text-sm text-muted-foreground">Registro completo de todas las interacciones y cambios</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
