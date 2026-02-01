import { ColorPalette } from "@/components/design-system/color-palette"
import { TypographyScale } from "@/components/design-system/typography-scale"
import { ButtonShowcase } from "@/components/design-system/button-showcase"
import { SpacingSystem } from "@/components/design-system/spacing-system"
import { IconSystem } from "@/components/design-system/icon-system"
import { CardExamples } from "@/components/design-system/card-examples"
import { Separator } from "@/components/ui/separator"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground">
        <div className="screen-margin py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">UL</span>
            </div>
            <div>
              <h1 className="text-primary-foreground">Sistema de Diseño</h1>
              <p className="text-secondary-foreground/80 text-body-m">
                App de Reportes Universitarios
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-caption">
            <span className="px-3 py-1 bg-primary/20 rounded-full">Mobile-First</span>
            <span className="px-3 py-1 bg-accent/20 rounded-full">8pt Grid</span>
            <span className="px-3 py-1 bg-primary/20 rounded-full">Major Second 1.125</span>
          </div>
        </div>
      </header>

      <main className="screen-margin py-8 section-gap">
        {/* Navegación */}
        <nav className="sticky top-0 z-10 -mx-4 px-4 py-4 bg-background/95 backdrop-blur border-b border-border md:static md:mx-0 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none md:border-0">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "colores", label: "Colores" },
              { id: "tipografia", label: "Tipografía" },
              { id: "botones", label: "Botones" },
              { id: "espaciado", label: "Espaciado" },
              { id: "iconos", label: "Iconos" },
              { id: "cards", label: "Cards" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-4 py-2 text-sm font-medium rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Sección: Colores */}
        <section id="colores" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Sistema de Colores</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Paleta institucional de la Universidad Libre optimizada para accesibilidad y estados de reporte.
            </p>
          </div>
          <ColorPalette />
        </section>

        <Separator className="my-8" />

        {/* Sección: Tipografía */}
        <section id="tipografia" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Escala Tipográfica</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Basada en una escala de Major Second (1.125) con diseño responsive.
            </p>
          </div>
          <TypographyScale />
        </section>

        <Separator className="my-8" />

        {/* Sección: Botones */}
        <section id="botones" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Anatomía de Botones</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Sistema de botones con matriz técnica de Box Model y comportamiento responsive.
            </p>
          </div>
          <ButtonShowcase />
        </section>

        <Separator className="my-8" />

        {/* Sección: Espaciado */}
        <section id="espaciado" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Sistema de Espaciado</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Basado en la regla del 8pt para consistencia visual y ritmo.
            </p>
          </div>
          <SpacingSystem />
        </section>

        <Separator className="my-8" />

        {/* Sección: Iconos */}
        <section id="iconos" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Iconografía</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Guías visuales consistentes en peso y estilo con áreas táctiles apropiadas.
            </p>
          </div>
          <IconSystem />
        </section>

        <Separator className="my-8" />

        {/* Sección: Cards */}
        <section id="cards" className="scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-primary">Componentes de Cards</h2>
            <p className="text-body-m text-muted-foreground mt-2">
              Ejemplos de cards para reportes con estados semánticos y jerarquía visual.
            </p>
          </div>
          <CardExamples />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground mt-16">
        <div className="screen-margin py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-semibold">Universidad Libre</p>
              <p className="text-caption text-secondary-foreground/70">
                Sistema de Diseño para App de Reportes Universitarios
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-caption text-secondary-foreground/70">
                Metodología: Mobile-First & Responsive
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
