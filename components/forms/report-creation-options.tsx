"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ImageIcon, FormIcon } from "lucide-react"
import Link from "next/link"
import { SimpleReportForm } from "./simple-report-form"
import { AIReportForm } from "./ai-report-form"

export function ReportCreationOptions() {
  const [selectedMode, setSelectedMode] = useState<"choice" | "simple" | "ai">("choice")

  if (selectedMode === "simple") {
    return <SimpleReportForm onBack={() => setSelectedMode("choice")} />
  }

  if (selectedMode === "ai") {
    return <AIReportForm onBack={() => setSelectedMode("choice")} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/worker">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-foreground">Crear Reporte</h1>
            <p className="text-xs text-muted-foreground">Elige cómo reportar el problema</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        {/* Option 1: Simple Form */}
        <button
          onClick={() => setSelectedMode("simple")}
          className="w-full text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(211, 18, 25, 0.1)" }}
                >
                  <FormIcon className="h-6 w-6" style={{ color: "#D31219" }} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Formulario Rápido</CardTitle>
                  <CardDescription>Describe el problema paso a paso</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cuéntanos dónde está el problema y qué pasó. La IA se encargará de priorizar y asignar automáticamente.
              </p>
            </CardContent>
          </Card>
        </button>

        {/* Option 2: AI Report */}
        <button
          onClick={() => setSelectedMode("ai")}
          className="w-full text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-accent">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(45, 138, 60, 0.1)" }}
                >
                  <ImageIcon className="h-6 w-6" style={{ color: "#2D8A3C" }} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Reporte por Imagen</CardTitle>
                  <CardDescription>Carga foto + descripción (más rápido)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sube una foto del problema y describe qué pasó. La IA analizará la imagen y completará el resto automáticamente.
              </p>
            </CardContent>
          </Card>
        </button>

        {/* Info */}
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm space-y-1">
          <p className="font-medium">¿Cómo funciona?</p>
          <p>
            La inteligencia artificial determinará automáticamente la prioridad, complejidad, área responsable y categorías según los detalles que proporciones.
          </p>
        </div>
      </main>
    </div>
  )
}
