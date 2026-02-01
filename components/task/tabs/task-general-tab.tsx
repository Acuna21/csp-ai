"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface GeneralTabProps {
  task: {
    assignedTo: {
      name: string
      avatar: string
      role: string
    }
    status: string
    progress: number
    criticality: string
    description: string
  }
  criticality: { label: string; color: string; bgColor: string }
  status: { label: string; color: string; bgColor: string }
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Pendiente", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  "in-progress": { label: "En Progreso", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  completed: { label: "Completado", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  "on-hold": { label: "En Espera", color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" },
}

export function TaskGeneralTab({ task, criticality, status }: GeneralTabProps) {
  return (
    <div className="space-y-6">
      {/* Assigned To Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">ASIGNADO A</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2" style={{ borderColor: '#B28A12' }}>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                {task.assignedTo.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{task.assignedTo.name}</p>
              <p className="text-sm text-muted-foreground">{task.assignedTo.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Status, Progress and Priority Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">ESTADO Y PROGRESO</CardTitle>
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

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Progreso</p>
              <span className="text-sm font-semibold text-foreground">{task.progress}%</span>
            </div>
            <Progress 
              value={task.progress} 
              className="h-2"
              indicatorColor={status.color}
            />
          </div>

          {/* Criticality/Priority */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Prioridad</p>
            <Badge 
              className="text-xs px-3 py-1.5 w-fit"
              style={{
                backgroundColor: criticality.bgColor,
                color: criticality.color,
                border: `1px solid ${criticality.color}20`
              }}
            >
              {criticality.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Description Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">DESCRIPCIÓN</CardTitle>
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
