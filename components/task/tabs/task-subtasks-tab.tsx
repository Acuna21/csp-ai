"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface SubtasksTabProps {
  subtasks: Subtask[]
}

export function TaskSubtasksTab({ subtasks }: SubtasksTabProps) {
  const completedCount = subtasks.filter(s => s.completed).length
  const progress = Math.round((completedCount / subtasks.length) * 100)

  return (
    <div className="space-y-6">
      {/* Subtasks Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-label">SUBTAREAS ({completedCount}/{subtasks.length})</CardTitle>
            <Badge 
              className="text-xs px-3 py-1 font-semibold"
              style={{
                backgroundColor: "rgba(45, 138, 60, 0.1)",
                color: "#2D8A3C",
                border: "1px solid rgba(45, 138, 60, 0.2)"
              }}
            >
              {progress}% Completado
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {subtasks.map((subtask, index) => (
            <div key={subtask.id}>
              <div className="flex items-center gap-3 py-3">
                <Checkbox 
                  checked={subtask.completed}
                  className="h-5 w-5 rounded border-2"
                  style={{
                    borderColor: subtask.completed ? "#2D8A3C" : "#E2E8F0"
                  }}
                />
                <div className="flex-1">
                  <p className={`text-sm ${subtask.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {subtask.title}
                  </p>
                </div>
                {subtask.completed && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
              {index < subtasks.length - 1 && <div className="border-b border-border" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">TAREAS RELACIONADAS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No hay tareas relacionadas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
