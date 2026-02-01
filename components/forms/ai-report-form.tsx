"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X, Loader2, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

interface AIReportData {
  image: File | null
  description: string
  imagePreview: string | null
}

interface AIReportFormProps {
  onBack: () => void
}

export function AIReportForm({ onBack }: AIReportFormProps) {
  const [formData, setFormData] = useState<AIReportData>({
    image: null,
    description: "",
    imagePreview: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"image" | "description" | "success">("image")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ image: "Solo se permiten imágenes" })
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ image: "La imagen no debe exceder 10MB" })
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          image: file,
          description: "",
          imagePreview: reader.result as string,
        })
        setStep("description")
        setErrors({})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      description: value,
    }))
    if (errors.description) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.description
        return newErrors
      })
    }
  }

  const removeImage = () => {
    setFormData({
      image: null,
      description: "",
      imagePreview: null,
    })
    setStep("image")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.image) newErrors.image = "La imagen es obligatoria"
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria"
    if (formData.description.length > 500) newErrors.description = "Máximo 500 caracteres"

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
      console.log("[v0] Submitting AI report with image and description:", {
        fileName: formData.image?.name,
        fileSize: formData.image?.size,
        description: formData.description,
      })

      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] AI processing complete - analyzing image and generating report metadata")
      setStep("success")
    } catch (error) {
      console.error("[v0] Error submitting AI report:", error)
      setErrors({ submit: "Error al procesar el reporte. Intenta de nuevo." })
      setIsSubmitting(false)
    }
  }

  const charCountDescription = formData.description.length

  // Step: Upload Image
  if (step === "image") {
    return (
      <div className="min-h-screen bg-background">
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
              <h1 className="font-semibold text-foreground">Reporte por Imagen</h1>
              <p className="text-xs text-muted-foreground">Paso 1 de 2</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 max-w-2xl mx-auto space-y-6 pb-24">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sube una foto del problema</CardTitle>
              <CardDescription>Esto nos ayuda a entender mejor la situación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer bg-muted/30">
                <div className="flex flex-col items-center justify-center p-6">
                  <Upload className="h-12 w-12 text-muted-foreground mb-3" />
                  <span className="text-sm font-medium text-foreground text-center">
                    Toca para subir foto
                  </span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    JPG, PNG (máx. 10MB)
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {errors.image && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{errors.image}</span>
                </div>
              )}

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs space-y-1">
                <p className="font-medium">Consejos para mejor análisis:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Asegúrate que se vea bien la zona con el problema</li>
                  <li>Buena iluminación (natural si es posible)</li>
                  <li>Evita fotos borrosas o con sombras</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Step: Add Description
  if (step === "description") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("image")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Atrás</span>
            </button>
            <div>
              <h1 className="font-semibold text-foreground">Describe el Problema</h1>
              <p className="text-xs text-muted-foreground">Paso 2 de 2</p>
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
            {/* Image Preview */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative w-full rounded-lg overflow-hidden bg-muted aspect-video">
                  {formData.imagePreview && (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-3 w-full text-sm text-red-600 hover:bg-red-50 py-2 rounded transition-colors"
                >
                  Cambiar foto
                </button>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">¿Qué pasó?</CardTitle>
                <CardDescription>Cuéntanos los detalles del problema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Ej: La puerta no cierra bien, hace ruido y está dañada desde hace una semana"
                    maxLength={500}
                    rows={5}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-base"
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <p>{errors.description}</p>
                    <span>{charCountDescription}/500</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
                  <p className="font-medium">La IA determinará automáticamente:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Prioridad del reporte</li>
                    <li>Complejidad del problema</li>
                    <li>Área responsable</li>
                    <li>Categorías relevantes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("image")}
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  Atrás
                </Button>
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 gap-2"
                style={{ backgroundColor: "#D31219" }}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Procesando..." : "Enviar Reporte"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    )
  }

  // Step: Success
  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(45, 138, 60, 0.1)" }}
            >
              <Check className="h-8 w-8" style={{ color: "#2D8A3C" }} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">¡Reporte Creado!</h1>
            <p className="text-muted-foreground">
              La IA está analizando la imagen y asignando automáticamente prioridad y área responsable.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#2D8A3C" }} />
                <span className="text-foreground">Imagen procesada y analizada</span>
              </div>
              <div className="flex items-start gap-3">
                <Loader2 className="h-5 w-5 flex-shrink-0 mt-0.5 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Asignando prioridad y área responsable</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button
              onClick={() => {
                setStep("image")
                setFormData({
                  image: null,
                  description: "",
                  imagePreview: null,
                })
                if (fileInputRef.current) fileInputRef.current.value = ""
              }}
              className="w-full"
              style={{ backgroundColor: "#D31219" }}
            >
              Crear Otro Reporte
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "/worker"}
            >
              Ir al Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
