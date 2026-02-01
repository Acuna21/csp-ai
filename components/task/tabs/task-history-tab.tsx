"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface HistoryEntry {
  id: string
  action: string
  details: string
  by: string
  timestamp: Date
  avatar: string
}

interface HistoryTabProps {
  history: HistoryEntry[]
}

const getActionColor = (action: string): { bgColor: string; color: string } => {
  switch (action.toLowerCase()) {
    case "actualizado":
      return { bgColor: "rgba(211, 18, 25, 0.1)", color: "#D31219" }
    case "asignado":
      return { bgColor: "rgba(45, 138, 60, 0.1)", color: "#2D8A3C" }
    case "creado":
      return { bgColor: "rgba(178, 138, 18, 0.1)", color: "#B28A12" }
    default:
      return { bgColor: "rgba(107, 114, 128, 0.1)", color: "#6B7280" }
  }
}

export function TaskHistoryTab({ history }: HistoryTabProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">REGISTRO DE CAMBIOS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {history.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No hay cambios registrados</p>
            </div>
          ) : (
            history.map((entry, index) => {
              const actionColor = getActionColor(entry.action)
              return (
                <div key={entry.id}>
                  <div className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center gap-2 pt-1">
                      <Avatar className="h-8 w-8 border-2 border-border">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                          {entry.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {index < history.length - 1 && (
                        <div className="w-0.5 h-12 bg-border" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1 pb-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Badge 
                            className="text-xs px-2 py-0.5"
                            style={{
                              backgroundColor: actionColor.bgColor,
                              color: actionColor.color,
                              border: `1px solid ${actionColor.color}20`
                            }}
                          >
                            {entry.action}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</p>
                      </div>
                      <p className="text-sm text-foreground font-medium mb-1">{entry.details}</p>
                      <p className="text-xs text-muted-foreground">Por: {entry.by}</p>
                    </div>
                  </div>
                  {index < history.length - 1 && (
                    <Separator className="my-4 ml-8" />
                  )}
                </div>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}
