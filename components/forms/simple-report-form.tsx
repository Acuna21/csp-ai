"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Link from "next/link"

interface FormData {
  title: string
  description: string
  floor: string
  space: string
  locationDetail: string
  attachments: File[]
}

const FLOOR_OPTIONS = [
  { value: "0", label: "Planta Baja" },
  { value: "1", label: "Primer Piso" },
  { value: "2", label: "Segundo Piso" },
  { value: "3", label: "Tercer Piso" },
  { value: "4", label: "Cuarto Piso" },
  { value: "5", label: "Quinto Piso" },
]

const SPACE_OPTIONS = [
  { value: "aula_301", label: "Aula 301" },
  { value: "aula_302", label: "Aula 302" },
  { value: "laboratorio_1", label: "Laboratorio 1" },
  { value: "biblioteca", label: "Biblioteca" },
  { value: "bano_mujeres", label: "Baño Mujeres" },
  { value: "bano_hombres", label: "Baño Hombres" },
  { value: "cafeteria", label: "Cafetería" },
  { value: "pasillo", label: "Pasillo" },
  { value: "otro", label: "Otro" },
]

interface SimpleReportFormProps {
  onBack: () => void
}

export function SimpleReportForm({ onBack }: SimpleReportFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    floor: "",
    space: "",
    locationDetail: "",
    attachments: [],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio"
    if (formData.title.length > 150) newErrors.title = "Máximo 150 caracteres"

    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    if (formData.description.length > 1000) newErrors.description = "Máximo 1000 caracteres"

    if (!formData.floor) newErrors.floor = "Selecciona el piso"
    if (!formData.space) newErrors.space = "Selecciona el espacio"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      console.log("[v0] Submitting simple report:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Reporte creado exitosamente. La IA está procesando tus datos...")
      // Reset form
      setFormData({
        title: "",
        description: "",
        floor: "",
        space: "",
        locationDetail: "",
        attachments: [],
      })
    } catch (error) {
      console.error("[v0] Error submitting report:", error)
      setErrors({ submit: "Error al crear el reporte. Intenta de nuevo." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const charCountTitle = formData.title.length
  const charCountDescription = formData.description.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Volver</span>
          </button>
          <div>
            <h1 className="font-semibold text-foreground">Formulario Rápido</h1>
            <p className="text-xs text-muted-foreground">Reporta el problema</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6 pb-24">
        {errors.submit && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Cuál es el problema?</CardTitle>
              <CardDescription>Cuéntanos en detalle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Puerta dañada"
                  maxLength={150}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <p>{errors.title}</p>
                  <span>{charCountTitle}/150</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="¿Qué pasó? ¿Cuándo? ¿Afecta a alguien?"
                  maxLength={1000}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-base"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <p>{errors.description}</p>
                  <span>{charCountDescription}/1000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">¿Dónde está?</CardTitle>
              <CardDescription>Ubicación del problema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Floor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Piso <span className="text-red-500">*</span>
                </label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                >
                  <option value="">Selecciona...</option>
                  {FLOOR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.floor && <p className="text-xs text-red-500">{errors.floor}</p>}
              </div>

              {/* Space */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Espacio <span className="text-red-500">*</span>
                </label>
                <select
                  name="space"
                  value={formData.space}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                >
                  <option value="">Selecciona...</option>
                  {SPACE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.space && <p className="text-xs text-red-500">{errors.space}</p>}
              </div>

              {/* Location Detail */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Detalle (Opcional)
                </label>
                <input
                  type="text"
                  name="locationDetail"
                  value={formData.locationDetail}
                  onChange={handleInputChange}
                  placeholder="Ej: Pared derecha, cerca ventana"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Archivos Adjuntos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fotos o Archivos</CardTitle>
              <CardDescription>Opcional pero recomendado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-foreground">Toca para subir</span>
                  <span className="text-xs text-muted-foreground">o arrastra archivos</span>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </label>

              {/* Attached Files List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Archivos:</p>
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <span className="text-sm text-foreground truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gap-2"
              style={{ backgroundColor: "#D31219" }}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Enviando..." : "Enviar Reporte"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
