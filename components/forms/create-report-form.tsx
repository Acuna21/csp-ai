"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

interface FormData {
  title: string
  description: string
  floor: string
  space: string
  locationDetail: string
  priority: "BAJA" | "MEDIA" | "ALTA" | "CRÍTICA" | ""
  impact: "BAJO" | "MEDIO" | "ALTO" | ""
  weight: number
  tags: string[]
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

const PRIORITY_OPTIONS = [
  { value: "BAJA", label: "Baja", color: "#2D8A3C" },
  { value: "MEDIA", label: "Media", color: "#B28A12" },
  { value: "ALTA", label: "Alta", color: "#D31219" },
  { value: "CRÍTICA", label: "Crítica", color: "#8B0000" },
]

const IMPACT_OPTIONS = [
  { value: "BAJO", label: "Bajo", color: "#2D8A3C" },
  { value: "MEDIO", label: "Medio", color: "#B28A12" },
  { value: "ALTO", label: "Alto", color: "#D31219" },
]

const AVAILABLE_TAGS = [
  "Infraestructura",
  "Seguridad",
  "Limpieza",
  "Electricidad",
  "Fontanería",
  "Mantenimiento",
  "Equipo",
  "Accesibilidad",
  "Urgente",
]

export function CreateReportForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    floor: "",
    space: "",
    locationDetail: "",
    priority: "",
    impact: "",
    weight: 5,
    tags: [],
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

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
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
    if (formData.title.length > 150) newErrors.title = "El título no puede exceder 150 caracteres"

    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    if (formData.description.length > 2000) newErrors.description = "La descripción no puede exceder 2000 caracteres"

    if (!formData.floor) newErrors.floor = "El piso es obligatorio"
    if (!formData.space) newErrors.space = "El espacio es obligatorio"
    if (!formData.priority) newErrors.priority = "La prioridad es obligatoria"
    if (!formData.impact) newErrors.impact = "El impacto es obligatorio"

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
      // Simulate API call
      console.log("[v0] Submitting report:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Reporte creado exitosamente")
      // Reset form
      setFormData({
        title: "",
        description: "",
        floor: "",
        space: "",
        locationDetail: "",
        priority: "",
        impact: "",
        weight: 5,
        tags: [],
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
          <Link href="/worker">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-foreground">Crear Nuevo Reporte</h1>
            <p className="text-xs text-muted-foreground">Reporta un problema en la universidad</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {errors.submit && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Básica</CardTitle>
              <CardDescription>Cuéntanos qué problema encontraste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Título del Reporte <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Puerta del aula dañada"
                  maxLength={150}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                  placeholder="Proporciona detalles sobre el problema. ¿Qué sucedió? ¿Cuándo sucedió? ¿Afecta a otras personas?"
                  maxLength={2000}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <p>{errors.description}</p>
                  <span>{charCountDescription}/2000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ubicación</CardTitle>
              <CardDescription>Dónde se encuentra el problema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Floor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Piso/Planta <span className="text-red-500">*</span>
                </label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecciona un piso</option>
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
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecciona un espacio</option>
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
                  Detalle de Ubicación (Opcional)
                </label>
                <input
                  type="text"
                  name="locationDetail"
                  value={formData.locationDetail}
                  onChange={handleInputChange}
                  placeholder="Ej: Pared derecha, cerca de la ventana"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Priorización */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Priorización</CardTitle>
              <CardDescription>Evalúa la urgencia y el impacto del problema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Prioridad <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRIORITY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          priority: option.value as typeof formData.priority,
                        }))
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        formData.priority === option.value
                          ? "border-current"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          formData.priority === option.value
                            ? `${option.color}20`
                            : "rgba(0, 0, 0, 0.05)",
                        color: formData.priority === option.value ? option.color : "#666",
                        borderColor: formData.priority === option.value ? option.color : "transparent",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.priority && <p className="text-xs text-red-500">{errors.priority}</p>}
              </div>

              {/* Impact */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Impacto <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {IMPACT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          impact: option.value as typeof formData.impact,
                        }))
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                        formData.impact === option.value
                          ? "border-current"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor:
                          formData.impact === option.value
                            ? `${option.color}20`
                            : "rgba(0, 0, 0, 0.05)",
                        color: formData.impact === option.value ? option.color : "#666",
                        borderColor: formData.impact === option.value ? option.color : "transparent",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.impact && <p className="text-xs text-red-500">{errors.impact}</p>}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Complejidad (1-10): <span className="font-bold" style={{ color: "#D31219" }}>
                    {formData.weight}
                  </span>
                </label>
                <input
                  type="range"
                  name="weight"
                  min="1"
                  max="10"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.weight <= 3
                    ? "Fácil de resolver"
                    : formData.weight <= 6
                      ? "Complejidad moderada"
                      : "Requiere expertise"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Etiquetas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorías</CardTitle>
              <CardDescription>Selecciona las etiquetas que apliquen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      formData.tags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Archivos Adjuntos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Archivos Adjuntos (Opcional)</CardTitle>
              <CardDescription>Sube fotos, documentos u otro archivo como evidencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium text-foreground">Haz clic para subir</span>
                  <span className="text-xs text-muted-foreground">o arrastra archivos aquí</span>
                </div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>

              {/* Attached Files List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Archivos adjuntos:</p>
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border"
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
            <Link href="/worker" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
              style={{ backgroundColor: "#D31219" }}
            >
              {isSubmitting ? "Creando..." : "Crear Reporte"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
