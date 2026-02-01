export function TypographyScale() {
  const typographyLevels = [
    {
      level: "H1",
      mobile: "32px",
      tablet: "40px",
      desktop: "48px",
      weight: "Bold (700)",
      example: "Títulos de Vista",
    },
    {
      level: "H2",
      mobile: "24px",
      tablet: "28px",
      desktop: "32px",
      weight: "Semibold (600)",
      example: "Subtítulos principales",
    },
    {
      level: "H3",
      mobile: "20px",
      tablet: "22px",
      desktop: "24px",
      weight: "Semibold (600)",
      example: "Títulos de Alerta",
    },
    {
      level: "Body M",
      mobile: "16px",
      tablet: "16px",
      desktop: "18px",
      weight: "Regular (400)",
      example: "Cuerpo de texto",
    },
    {
      level: "Caption",
      mobile: "12px",
      tablet: "12px",
      desktop: "14px",
      weight: "Regular (400)",
      example: "Metadatos e información secundaria",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Tabla de especificaciones */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Nivel</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Mobile</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground hidden sm:table-cell">Tablet</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground hidden md:table-cell">Desktop</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Peso</th>
            </tr>
          </thead>
          <tbody>
            {typographyLevels.map((level) => (
              <tr key={level.level} className="border-b border-border">
                <td className="py-3 px-4 font-mono text-primary">{level.level}</td>
                <td className="py-3 px-4 text-muted-foreground">{level.mobile}</td>
                <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{level.tablet}</td>
                <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{level.desktop}</td>
                <td className="py-3 px-4 text-muted-foreground">{level.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ejemplos visuales */}
      <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
        <div className="space-y-1">
          <span className="text-label text-muted-foreground">H1 - Títulos de Vista</span>
          <h1>Inicio</h1>
        </div>
        
        <div className="space-y-1">
          <span className="text-label text-muted-foreground">H2 - Subtítulos</span>
          <h2>Mis Reportes</h2>
        </div>
        
        <div className="space-y-1">
          <span className="text-label text-muted-foreground">H3 - Títulos de Alerta</span>
          <h3>Incidencia en Edificio A</h3>
        </div>
        
        <div className="space-y-1">
          <span className="text-label text-muted-foreground">Body M - Cuerpo de Texto</span>
          <p className="text-body-m">
            Este es un ejemplo de texto de cuerpo que se utiliza para la lectura de detalles en los reportes universitarios. El interlineado es de 1.5x para facilitar la lectura.
          </p>
        </div>
        
        <div className="space-y-1">
          <span className="text-label text-muted-foreground">Caption - Metadatos</span>
          <p className="text-caption text-muted-foreground">ID: 1234 • Creado: 24/01/2026</p>
        </div>
      </div>
    </div>
  )
}
