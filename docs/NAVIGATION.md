# Sistema de Navegación Responsivo

## Descripción General

El sistema de navegación está diseñado con un enfoque **mobile-first** y se adapta automáticamente para dispositivos de diferentes tamaños.

### Componentes Principales

#### 1. **MobileNav** (`mobile-nav.tsx`)
- Barra de navegación inferior para dispositivos móviles
- Visible solo en pantallas menores a 768px (md breakpoint)
- 5 botones principales con iconos
- Indicador visual (línea roja) del elemento activo
- Altura fija de 64px (16rem) para facilitar toques

**Elementos:**
- Inicio (/)
- Reportes (/worker)
- Nuevo Reporte (/report/new) - botón central destacado
- Admin (/admin)
- Diseño (/design-system)

#### 2. **DesktopNav** (`desktop-nav.tsx`)
- Encabezado fijo en la parte superior
- Visible solo en pantallas mayores a 768px
- Logo de la universidad (UL)
- Menú horizontal con 4 opciones
- Botón "Nuevo Reporte" destacado

**Características:**
- Logo con brand color #D31219
- Indicador de página activa
- Botón CTA (Call To Action) para crear reportes
- Espaciado horizontal optimizado

#### 3. **MainNav** (`main-nav.tsx`)
- Componente envoltorio que renderiza ambas navegaciones
- Gestiona la visibilidad según el breakpoint de Tailwind

### Estructura de Rutas

```
/ → Página principal
/worker → Dashboard de trabajadores
/report/new → Crear nuevo reporte
  /report/create → Formulario de reporte (legacy)
  /report/[id] → Detalle de reporte
/admin → Panel de administración
  /admin/locations → Gestión de ubicaciones
  /admin/areas → Gestión de áreas
  /admin/workers → Gestión de trabajadores
  /admin/area-heads → Jefes de área
  /admin/tags → Etiquetas personalizadas
  /admin/criticality → Niveles de criticidad
  /admin/task-states → Estados de tareas
  /admin/weights → Pesos de complejidad
/task/[id] → Detalle de tarea
/design-system → Sistema de diseño visual
```

### Breakpoints

- **Mobile**: < 768px (md)
  - MobileNav visible
  - Padding inferior pb-20 para evitar superposición
  - DesktopNav oculto

- **Desktop**: ≥ 768px (md)
  - MobileNav oculto
  - DesktopNav visible
  - Sin padding inferior

### Integración en el Layout

El archivo `/app/layout.tsx` incluye:

```tsx
import { MainNav } from '@/components/navigation/main-nav'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MainNav />
        <main className="md:pt-0 pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  )
}
```

### Estilos de Navegación

**Colors:**
- Activo: #D31219 (Rojo Universidad Libre)
- Hover: bg-muted
- Text activo: text-red-600
- Background: color de fondo del tema

**Typography:**
- Desktop: font-medium text-sm
- Mobile: font-medium text-xs
- Labels en mobile: etiquetas de 1-2 palabras

**Indicadores Activos:**
- Desktop: línea inferior roja + fondo rojo claro
- Mobile: línea superior roja (10px height)

### Estados de Navegación

1. **Activo**: La página actual está marcada
   - Indicador visual prominente
   - Color rojo distintivo
   - Efecto visual claro

2. **Hover**: Al pasar el mouse (desktop)
   - Cambio de color de texto
   - Fondo muted sutil

3. **Inactivo**: Otros elementos
   - Texto muted-foreground
   - Sin indicador visual

### Funcionalidad de Rutas Activas

Utiliza `usePathname()` de Next.js para detectar la ruta actual:

```tsx
const pathname = usePathname()
const isActive = pathname === item.href || pathname.startsWith(item.href)
```

Esto permite que:
- Las rutas exactas se marquen como activas
- Las subrutas bajo un prefijo también se marquen como activas
- Ejemplo: `/admin/locations` marca `/admin` como activo

### Accesibilidad

- Etiquetas `aria-label` en botones móviles
- Contraste de colores suficiente
- Tamaño de botones ≥ 44px (recomendación WCAG)
- Navegación semántica con `<nav>`

### Próximos Pasos para Desarrollo

1. **Autenticación**: Agregar lógica para mostrar/ocultar secciones según el rol del usuario
2. **Breadcrumbs**: Implementar migas de pan en vistas anidadas
3. **Menú Hamburguesa**: Alternativa para dispositivos muy pequeños
4. **Notificaciones**: Agregar badge contador en el icono de Reportes
5. **Búsqueda**: Implementar búsqueda global en la barra de navegación

## Archivos Relacionados

- `/components/navigation/mobile-nav.tsx` - Navegación móvil
- `/components/navigation/desktop-nav.tsx` - Navegación desktop
- `/components/navigation/main-nav.tsx` - Componente envoltorio
- `/app/layout.tsx` - Layout principal que incluye la navegación
