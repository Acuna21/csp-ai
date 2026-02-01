export function SpacingSystem() {
  const spacingScale = [
    { name: "4px", class: "w-1", description: "Micro espaciado" },
    { name: "8px", class: "w-2", description: "Label-Input gap" },
    { name: "12px", class: "w-3", description: "Elementos relacionados" },
    { name: "16px", class: "w-4", description: "Cards, márgenes móvil" },
    { name: "24px", class: "w-6", description: "Secciones" },
    { name: "32px", class: "w-8", description: "Bloques grandes" },
    { name: "48px", class: "w-12", description: "Touch target mínimo" },
  ]

  return (
    <div className="space-y-8">
      {/* Escala visual */}
      <div className="space-y-4">
        <h3 className="mb-4">Escala de Espaciado (8pt Grid)</h3>
        {spacingScale.map((space) => (
          <div key={space.name} className="flex items-center gap-4">
            <div className="w-16 text-sm font-mono text-muted-foreground">
              {space.name}
            </div>
            <div className={`h-4 bg-primary rounded ${space.class}`} />
            <div className="text-sm text-muted-foreground">{space.description}</div>
          </div>
        ))}
      </div>

      {/* Reglas de proximidad */}
      <div className="space-y-4">
        <h3>Reglas de Proximidad</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-label text-muted-foreground mb-2">Label - Input</p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="h-10 bg-muted rounded-lg border border-border" />
            </div>
            <p className="text-caption text-muted-foreground mt-2">Gap: 8px</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-label text-muted-foreground mb-2">Card - Card</p>
            <div className="space-y-4">
              <div className="h-16 bg-muted rounded-lg border border-border" />
              <div className="h-16 bg-muted rounded-lg border border-border" />
            </div>
            <p className="text-caption text-muted-foreground mt-2">Gap: 16px</p>
          </div>
          
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-label text-muted-foreground mb-2">Sección - Sección</p>
            <div className="space-y-6">
              <div className="h-12 bg-muted rounded-lg border border-border" />
              <div className="h-12 bg-muted rounded-lg border border-border" />
            </div>
            <p className="text-caption text-muted-foreground mt-2">Gap: 24px</p>
          </div>
        </div>
      </div>

      {/* Márgenes de pantalla */}
      <div className="space-y-4">
        <h3>Márgenes de Pantalla</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Dispositivo</th>
                <th className="text-left py-3 px-4 font-semibold">Margen</th>
                <th className="text-left py-3 px-4 font-semibold">Contenedor</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Mobile</td>
                <td className="py-3 px-4 font-mono text-primary">16px</td>
                <td className="py-3 px-4 text-muted-foreground">100%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Tablet</td>
                <td className="py-3 px-4 font-mono text-primary">24px</td>
                <td className="py-3 px-4 text-muted-foreground">100%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Desktop</td>
                <td className="py-3 px-4 font-mono text-primary">auto</td>
                <td className="py-3 px-4 text-muted-foreground">max-width: 1200px (centrado)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
