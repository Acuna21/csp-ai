"use client"

interface ColorSwatchProps {
  name: string
  hex: string
  token: string
  description?: string
}

function ColorSwatch({ name, hex, token, description }: ColorSwatchProps) {
  return (
    <div className="flex flex-col">
      <div
        className="h-20 w-full rounded-lg border border-border shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <div className="mt-2 space-y-1">
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{hex}</p>
        <p className="font-mono text-xs text-muted-foreground">{token}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

export function ColorPalette() {
  const brandColors = [
    { name: "Primario (Rojo)", hex: "#D31219", token: "--brand-primary", description: "CTAs, Títulos H1, Estados críticos" },
    { name: "Secundario (Negro)", hex: "#000000", token: "--brand-secondary", description: "Header/Footer, texto de alta jerarquía" },
    { name: "Acento (Dorado)", hex: "#B28A12", token: "--brand-accent", description: "Iconos de soporte, estados preventivos" },
  ]

  const neutralColors = [
    { name: "Background", hex: "#F7F7F7", token: "--background", description: "Fondo general (Canvas)" },
    { name: "Surface", hex: "#FFFFFF", token: "--card", description: "Fondo de tarjetas, inputs, modales" },
    { name: "Border", hex: "#E2E8F0", token: "--border", description: "Líneas divisorias y bordes" },
  ]

  const semanticColors = [
    { name: "Éxito", hex: "#2D8A3C", token: "--success", description: "Reportes finalizados" },
    { name: "Alerta", hex: "#B28A12", token: "--warning", description: "Incidencias en revisión" },
    { name: "Error", hex: "#D31219", token: "--error", description: "Incidencias críticas" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Colores de Marca</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {brandColors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4">Colores Neutros y Superficies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {neutralColors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4">Colores Semánticos (Estados)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {semanticColors.map((color) => (
            <ColorSwatch key={color.token} {...color} />
          ))}
        </div>
      </div>
    </div>
  )
}
