"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MapPin, AlertCircle, Weight, Zap } from "lucide-react"

interface ReporterInfo {
  name: string
  avatar: string
  email: string
}

interface AssignmentInfo {
  name: string
  avatar: string
  role: string
  department: string
}

interface LocationInfo {
  space: string
  floor: string
  detail: string
}

interface GeneralTabProps {
  task: {
    reportedBy: ReporterInfo
    assignedTo: AssignmentInfo
    location: LocationInfo
    status: string
    priority: string
    impact: string
    weight: number
    description: string
    createdAt: Date
    updatedAt: Date
  }
  priority: { label: string; color: string; bgColor: string }
  status: { label: string; color: string; bgColor: string }
}

const priorityConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  BAJA: { label: "Baja", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  MEDIA: { label: "Media", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  ALTA: { label: "Alta", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  CRÍTICA: { label: "Crítica", color: "#8B0000", bgColor: "rgba(139, 0, 0, 0.1)" },
}

const impactConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  BAJO: { label: "Bajo", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  MEDIO: { label: "Medio", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  ALTO: { label: "Alto", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  ABIERTO: { label: "Abierto", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  EN_PROCESO: { label: "En Proceso", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  PAUSADO: { label: "Pausado", color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" },
  RESUELTO: { label: "Resuelto", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  CERRADO: { label: "Cerrado", color: "#000000", bgColor: "rgba(0, 0, 0, 0.1)" },
  CANCELADO: { label: "Cancelado", color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" },
}

export function TaskGeneralTab({ task, priority, status }: GeneralTabProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      {/* Reported By Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">REPORTADO POR</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2" style={{ borderColor: '#B28A12' }}>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                {task.reportedBy.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{task.reportedBy.name}</p>
              <p className="text-sm text-muted-foreground">{task.reportedBy.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Assigned To Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">ASIGNADO A</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2" style={{ borderColor: '#D31219' }}>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                {task.assignedTo.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{task.assignedTo.name}</p>
              <p className="text-sm text-muted-foreground">{task.assignedTo.role}</p>
              <p className="text-xs text-muted-foreground">{task.assignedTo.department}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">UBICACIÓN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">{task.location.space}</p>
              <p className="text-sm text-muted-foreground">Piso {task.location.floor}</p>
              {task.location.detail && (
                <p className="text-xs text-muted-foreground italic">{task.location.detail}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Status, Priority and Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">ESTADO Y EVALUACIÓN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Estado</p>
            <Badge 
              className="text-xs px-3 py-1.5 w-fit"
              style={{
                backgroundColor: status.bgColor,
                color: status.color,
                border: `1px solid ${status.color}20`
              }}
            >
              {status.label}
            </Badge>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Prioridad</p>
            </div>
            <Badge 
              className="text-xs px-3 py-1.5 w-fit"
              style={{
                backgroundColor: priority.bgColor,
                color: priority.color,
                border: `1px solid ${priority.color}20`
              }}
            >
              {priority.label}
            </Badge>
          </div>

          {/* Impact */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Impacto</p>
            <Badge 
              className="text-xs px-3 py-1.5 w-fit"
              style={{
                backgroundColor: impactConfig[task.impact].bgColor,
                color: impactConfig[task.impact].color,
                border: `1px solid ${impactConfig[task.impact].color}20`
              }}
            >
              {impactConfig[task.impact].label}
            </Badge>
          </div>

          {/* Weight/Complexity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Complejidad</p>
              </div>
              <span className="text-sm font-bold" style={{ color: '#D31219' }}>
                {task.weight}/10
              </span>
            </div>
            <Progress value={task.weight * 10} className="h-2" />
          </div>

          {/* Dates */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Creado</p>
              <p className="text-sm text-foreground">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Última actualización</p>
              <p className="text-sm text-foreground">{formatDate(task.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Description Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">DESCRIPCIÓN DEL PROBLEMA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
            <p className="text-sm text-foreground whitespace-pre-line">{task.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
