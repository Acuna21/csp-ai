# Sistema de Creación de Reportes - Mobile-First

## Descripción General

El nuevo sistema de creación de reportes está diseñado completamente para mobile-first, con dos flujos principales:

1. **Formulario Rápido** - Ingreso manual del problema
2. **Reporte por Imagen** - Upload de foto + descripción

En ambos casos, la **IA asigna automáticamente**:
- Prioridad (BAJA, MEDIA, ALTA, CRÍTICA)
- Complejidad (weight 1-10)
- Área encargada
- Categorías/tags
- Impacto estimado

## Rutas y Componentes

### Ruta Principal
- `/app/report/new/page.tsx` - Punto de entrada para crear reporte
- Muestra dos opciones de creación

### Componentes

#### 1. ReportCreationOptions (`/components/forms/report-creation-options.tsx`)
- Selector inicial con dos opciones visuales
- Alternancia entre vistas sin recargar página
- Adaptado para tap fácil en mobile
- 108 líneas

**Props:**
- None (componente raíz)

**Estados:**
- `choice` - Mostrar opciones iniciales
- `simple` - Formulario rápido
- `ai` - Reporte por imagen

---

#### 2. SimpleReportForm (`/components/forms/simple-report-form.tsx`)
Formulario ligero con solo campos esenciales:

**Campos:**
- `title` (obligatorio, max 150 chars)
- `description` (obligatorio, max 1000 chars)
- `floor` (obligatorio - select)
- `space` (obligatorio - select)
- `locationDetail` (opcional)
- `attachments` (opcional - multiple files)

**NO incluye** (asignados por IA):
- ❌ priority
- ❌ weight/complexity
- ❌ impact
- ❌ tags
- ❌ department assignment

**Features:**
- Validación en tiempo real
- Contador de caracteres
- Upload drag & drop
- Responsive touch targets (min 44px height)
- 353 líneas

**Mobile Optimizations:**
```
- text-base font-size (evita zoom en iOS)
- py-2.5 padding vertical generoso
- Input focus ring de 2px
- Full-width buttons
- pb-24 para evitar overlap con mobile keyboards
```

---

#### 3. AIReportForm (`/components/forms/ai-report-form.tsx`)
Flujo multi-paso optimizado para mobile con análisis por IA:

**Paso 1: Upload Imagen**
- Área grande de drop (aspect-square)
- Validación de tipo (JPG, PNG, WebP)
- Validación de tamaño (max 10MB)
- Mensajes de error claros
- Tips para mejor foto

**Paso 2: Descripción**
- Preview de imagen (aspect-video)
- Textarea para descripción (max 500 chars)
- Botón para cambiar foto
- Info sobre lo que asigna IA

**Paso 3: Éxito**
- Estado visual del proceso
- Opciones para crear otro o ir a dashboard
- 373 líneas

**Mobile Optimizations:**
- Multi-step para no saturar pantalla
- Imagen preview grande para verificación
- Buttons amplios (flex-1 en grid)
- Loading states claros

---

## Flujo de Usuario (Mobile)

### Opción 1: Formulario Rápido
```
1. Toca "Crear Nuevo Reporte" (worker dashboard)
2. Ve dos opciones visuales
3. Toca "Formulario Rápido"
4. Completa: título, descripción, piso, espacio, detalles
5. Opcional: sube fotos/archivos
6. Toca "Enviar Reporte"
7. Confirmación
```

### Opción 2: Reporte por Imagen
```
1. Toca "Crear Nuevo Reporte" (worker dashboard)
2. Ve dos opciones visuales
3. Toca "Reporte por Imagen"
4. PASO 1: Sube foto del problema
5. PASO 2: Describe qué pasó
6. Toca "Enviar Reporte"
7. IA procesa imagen y genera metadata
8. Confirmación + opciones
```

## Integración con IA

### Datos Enviados al Backend

**SimpleReportForm:**
```typescript
{
  type: "manual",
  title: string,
  description: string,
  floor: string,
  space: string,
  locationDetail: string,
  attachments: File[],
  // Backend asigna: priority, weight, impact, tags, department
}
```

**AIReportForm:**
```typescript
{
  type: "ai_image",
  image: File,
  description: string,
  // Backend:
  // 1. Analiza imagen con computer vision
  // 2. Combina análisis + descripción
  // 3. Asigna: priority, weight, impact, tags, department, location
}
```

### Respuesta Esperada

```typescript
{
  id: string,
  status: "ABIERTO",
  priority: "ALTA" | "MEDIA" | "BAJA" | "CRÍTICA",
  impact: "ALTO" | "MEDIO" | "BAJO",
  weight: number, // 1-10
  tags: string[],
  assignedDepartment: string,
  assignedTo?: string,
  // ... resto de campos del reporte
}
```

## Validaciones

### SimpleReportForm

| Campo | Reglas |
|-------|--------|
| title | Requerido, max 150 chars, no vacío |
| description | Requerido, max 1000 chars, no vacío |
| floor | Select requerido |
| space | Select requerido |
| locationDetail | Opcional |
| attachments | Opcional, max 10 archivos |

### AIReportForm

| Campo | Reglas |
|-------|--------|
| image | Requerido, JPG/PNG/WebP, max 10MB |
| description | Requerido, max 500 chars, no vacío |

## Estilos y Diseño

### Colores (Universidad Libre)
- Primary: #D31219 (Rojo)
- Success: #2D8A3C (Verde)
- Warning: #B28A12 (Oro)
- Neutral: #6B7280 (Gris)

### Mobile-First Typography
- Base: 16px (evita auto-zoom iOS)
- Headings: font-semibold, text-lg
- Labels: font-medium, text-sm
- Hints: text-xs, text-muted-foreground

### Touch Targets
- Mínimo 44px height para botones
- Mínimo 44px height para inputs
- Spacing entre elementos: 16px (gap-4)

## Testing Checklist

- [ ] Formulario funciona en devices pequeños (320px)
- [ ] Inputs no se zoom en iOS al focus
- [ ] Upload de archivos funciona
- [ ] Preview de imágenes se carga
- [ ] Validaciones se muestran bien
- [ ] Botones tienen tamaño toque adecuado
- [ ] Keyboard no cubre inputs importantes
- [ ] Transiciones suaves entre pasos
- [ ] Error states claros
- [ ] Loading states visible

## Roadmap Futuro

1. **Integración Real con IA:**
   - Google Vision API para análisis de imagen
   - OCR para números/detalles
   - ML para asignación automática

2. **Geolocalización:**
   - Auto-fill de ubicación si está disponible
   - Mapa de selección de espacio

3. **Captura Directa de Cámara:**
   - Acceso a cámara del dispositivo
   - Crop/rotate de imagen

4. **Voice Report:**
   - Reportes por voz (speech-to-text)
   - Ideal para emergencias

5. **Analytics:**
   - Seguimiento de tipos de reportes más comunes
   - Tiempos de resolución
   - Departamentos más ocupados
