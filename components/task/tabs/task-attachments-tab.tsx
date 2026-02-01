"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Image as ImageIcon, Download, Trash2, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Attachment {
  id: string
  name: string
  size: string
  type: "document" | "image" | "video" | "other"
}

interface AttachmentsTabProps {
  attachments: Attachment[]
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return <ImageIcon className="h-5 w-5" />
    case "document":
      return <FileText className="h-5 w-5" />
    default:
      return <FileText className="h-5 w-5" />
  }
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    document: "Documento",
    image: "Imagen",
    video: "Video",
    other: "Archivo"
  }
  return labels[type] || "Archivo"
}

export function TaskAttachmentsTab({ attachments }: AttachmentsTabProps) {
  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-dashed border-2" style={{ borderColor: "rgba(211, 18, 25, 0.2)" }}>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: "rgba(211, 18, 25, 0.1)" }}
            >
              <Plus className="h-5 w-5" style={{ color: "#D31219" }} />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm text-foreground">Arrastra archivos aquí</p>
              <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              style={{ borderColor: "#D31219", color: "#D31219" }}
            >
              Seleccionar archivos
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Attachments List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-label">
            ARCHIVOS ({attachments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attachments.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No hay archivos adjuntos</p>
            </div>
          ) : (
            attachments.map((attachment, index) => (
              <div key={attachment.id}>
                <div className="flex items-center gap-3 py-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "rgba(211, 18, 25, 0.1)" }}
                  >
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{attachment.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{attachment.size}</span>
                      <Badge 
                        variant="secondary" 
                        className="text-[10px] px-2 py-0.5"
                      >
                        {getTypeLabel(attachment.type)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Descargar</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </div>
                {index < attachments.length - 1 && <div className="border-b border-border" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
