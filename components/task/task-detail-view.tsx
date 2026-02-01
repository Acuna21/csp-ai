"use client"

import { ArrowLeft, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskGeneralTab } from "./tabs/task-general-tab"
import { TaskSubtasksTab } from "./tabs/task-subtasks-tab"
import { TaskAttachmentsTab } from "./tabs/task-attachments-tab"
import { TaskHistoryTab } from "./tabs/task-history-tab"
import Link from "next/link"

// Mock data - replace with actual data from DB/API
const mockTask = {
  id: "TASK-001",
  title: "Problema con matrícula de estudiante",
  lastUpdated: new Date("2024-01-15T14:30:00"),
  lastUpdatedBy: "Laura Rodríguez",
  tags: ["Urgente", "Matrícula", "Académico"],
  assignedTo: {
    name: "Juan Pérez García",
    avatar: "JP",
    role: "Coordinador"
  },
  status: "in-progress",
  progress: 65,
  criticality: "critical",
  description: "El estudiante María González reporta que no puede completar su matrícula para el semestre 2024-2. Ha intentado múltiples veces pero el sistema no acepta su solicitud. Necesita resolver esto antes del 20 de enero.",
  attachments: [
    { id: "1", name: "Captura de pantalla error.png", size: "2.4 MB", type: "image" },
    { id: "2", name: "Documento de identidad.pdf", size: "1.8 MB", type: "document" },
  ],
  history: [
    {
      id: "h1",
      action: "Actualizado",
      details: "Cambió el estado a 'En Progreso'",
      by: "Laura Rodríguez",
      timestamp: new Date("2024-01-15T14:30:00"),
      avatar: "LR"
    },
    {
      id: "h2",
      action: "Asignado",
      details: "Tarea asignada a Juan Pérez García",
      by: "Sistema",
      timestamp: new Date("2024-01-15T10:00:00"),
      avatar: "SYS"
    },
    {
      id: "h3",
      action: "Creado",
      details: "Tarea creada desde reporte",
      by: "María García",
      timestamp: new Date("2024-01-15T09:00:00"),
      avatar: "MG"
    }
  ],
  subtasks: [
    { id: "st1", title: "Verificar datos de estudiante en sistema", completed: true },
    { id: "st2", title: "Contactar estudiante para información adicional", completed: true },
    { id: "st3", title: "Escalar a departamento de IT", completed: false },
    { id: "st4", title: "Confirmar resolución con estudiante", completed: false },
  ]
}

const criticalityConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  critical: {
    label: "Crítico",
    color: "#D31219",
    bgColor: "rgba(211, 18, 25, 0.1)"
  },
  medium: {
    label: "Medio",
    color: "#B28A12",
    bgColor: "rgba(178, 138, 18, 0.1)"
  },
  low: {
    label: "Bajo",
    color: "#2D8A3C",
    bgColor: "rgba(45, 138, 60, 0.1)"
  }
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Pendiente", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  "in-progress": { label: "En Progreso", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  completed: { label: "Completado", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  "on-hold": { label: "En Espera", color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" },
}

export function TaskDetailView({ taskId }: { taskId: string }) {
  const task = mockTask
  const criticality = criticalityConfig[task.criticality]
  const status = statusConfig[task.status]

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/worker">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Volver</span>
              </Button>
            </Link>
            <div>
              <p className="font-semibold text-foreground">Laura Rodríguez</p>
              <p className="text-xs text-muted-foreground">Coordinadora Académica</p>
            </div>
            <Avatar className="h-10 w-10 border-2 ml-auto" style={{ borderColor: '#B28A12' }}>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                LR
              </AvatarFallback>
            </Avatar>
          </div>
          <Button 
            size="icon" 
            variant="ghost"
            className="relative h-10 w-10"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span 
              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: '#D31219' }}
            />
            <span className="sr-only">Notificaciones</span>
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Task Header Section */}
        <section className="space-y-4">
          {/* Title and ID */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-label text-muted-foreground mb-2">ID de Tarea</p>
                <h1 className="text-primary font-bold mb-3">{task.id}</h1>
                <h2 className="text-2xl font-bold text-foreground">{task.title}</h2>
              </div>
            </div>
            
            {/* Metadata */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Última actualización:</span>
                <span className="font-medium text-foreground">{formatDate(task.lastUpdated)}</span>
                <span>por</span>
                <span className="font-medium text-foreground">{task.lastUpdatedBy}</span>
              </div>
              
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {task.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    className="text-xs px-3 py-1"
                    style={{
                      backgroundColor: "rgba(211, 18, 25, 0.1)",
                      color: "#D31219",
                      border: "1px solid rgba(211, 18, 25, 0.2)"
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
            <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
            <TabsTrigger value="subtasks" className="text-xs sm:text-sm">Subtareas</TabsTrigger>
            <TabsTrigger value="attachments" className="text-xs sm:text-sm">Archivos</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">Historial</TabsTrigger>
          </TabsList>

          {/* Tab 1: General */}
          <TabsContent value="general" className="space-y-6">
            <TaskGeneralTab task={task} criticality={criticality} status={status} />
          </TabsContent>

          {/* Tab 2: Subtasks */}
          <TabsContent value="subtasks" className="space-y-6">
            <TaskSubtasksTab subtasks={task.subtasks} />
          </TabsContent>

          {/* Tab 3: Attachments */}
          <TabsContent value="attachments" className="space-y-6">
            <TaskAttachmentsTab attachments={task.attachments} />
          </TabsContent>

          {/* Tab 4: History */}
          <TabsContent value="history" className="space-y-6">
            <TaskHistoryTab history={task.history} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
