# Sistema de Reportes de Incidencias - Guía de Implementación

## Resumen General

Este documento describe la estructura completa del sistema de reportes de incidencias universitarias, incluyendo el formulario de creación y la visualización detallada de reportes.

## Ubicaciones de Archivos Clave

### Páginas
- `/app/report/create/page.tsx` - Página para crear nuevos reportes
- `/app/task/[id]/page.tsx` - Página de detalle de reporte (dinámica)

### Componentes
- `/components/forms/create-report-form.tsx` - Formulario completo de creación de reportes
- `/components/task/task-detail-view.tsx` - Vista principal del detalle de reporte
- `/components/task/tabs/task-general-tab.tsx` - Pestaña General (información completa del modelo)
- `/components/task/tabs/task-subtasks-tab.tsx` - Pestaña de Subtareas
- `/components/task/tabs/task-attachments-tab.tsx` - Pestaña de Archivos Adjuntos
- `/components/task/tabs/task-history-tab.tsx` - Pestaña de Historial de Cambios
- `/components/home/worker-home-view.tsx` - Panel principal con botón para crear reportes

## Modelo de Datos Implementado

### Incidencia (Report)
```typescript
{
  id: string                    // ID único del reporte
  title: string                 // Título (max 150 caracteres)
  description: string           // Descripción (max 2000 caracteres)
  createdAt: Date              // Fecha de creación
  updatedAt: Date              // Última actualización
  
  // Reportante
  reportedBy: {
    name: string
    avatar: string
    email: string
  }
  
  // Asignación
  assignedTo: {
    name: string
    avatar: string
    role: string
    department: string
  }
  
  // Ubicación
  location: {
    space: string              // Aula, Laboratorio, etc.
    floor: string              // Número de piso
    detail: string             // Detalle adicional
  }
  
  // Priorización
  priority: "BAJA" | "MEDIA" | "ALTA" | "CRÍTICA"
  impact: "BAJO" | "MEDIO" | "ALTO"
  weight: number               // Complejidad 1-10
  
  // Estado
  status: "ABIERTO" | "EN_PROCESO" | "PAUSADO" | "RESUELTO" | "CERRADO" | "CANCELADO"
  
  // Relaciones
  tags: string[]               // Categorías/Etiquetas
  attachments: Attachment[]    // Archivos adjuntos
  history: HistoryEntry[]      // Cambios auditados
  subtasks: Subtask[]          // Tareas relacionadas
}
```

## Flujo de Creación de Reporte

### 1. Acceso al Formulario
- Desde la página de inicio (`/worker`), presionar "Crear Nuevo Reporte"
- Redirige a `/report/create`

### 2. Secciones del Formulario

#### Información Básica
- **Título**: Resumen breve del problema (obligatorio)
- **Descripción**: Detalles completos (obligatorio)

#### Ubicación
- **Piso/Planta**: Seleccionar de lista (obligatorio)
- **Espacio**: Aula, Laboratorio, Baño, etc. (obligatorio)
- **Detalle de Ubicación**: Información adicional (opcional)

#### Priorización
- **Prioridad**: BAJA, MEDIA, ALTA, CRÍTICA (obligatorio)
- **Impacto**: BAJO, MEDIO, ALTO (obligatorio)
- **Complejidad**: Escala de 1-10 (valor por defecto: 5)

#### Categorías
- Seleccionar etiquetas aplicables (opcional)
- Opciones: Infraestructura, Seguridad, Limpieza, Electricidad, etc.

#### Archivos Adjuntos
- Subir evidencia: fotos, documentos PDF, etc. (opcional)
- Drag & drop o click para seleccionar

### 3. Validaciones
- Título no vacío y máximo 150 caracteres
- Descripción no vacía y máximo 2000 caracteres
- Piso y espacio obligatorios
- Prioridad e impacto obligatorios
- Complejidad entre 1-10

### 4. Envío
- Al hacer submit, se ejecuta validación
- En producción: POST a `/api/reports`
- Redirige a vista de detalle del reporte creado

## Flujo de Visualización de Detalle

### Estructura General
```
┌─ HEADER (Navegación y usuario)
│
├─ SECCIÓN TÍTULO
│  ├─ ID del Reporte
│  ├─ Título principal
│  ├─ Última actualización
│  └─ Etiquetas
│
├─ TABS (4 pestañas)
│  ├─ General (información completa)
│  ├─ Subtareas y tareas relacionadas
│  ├─ Archivos adjuntos
│  └─ Historial de cambios
```

### Pestaña General - Información Completa

1. **Reportado Por**
   - Avatar, nombre, email del creador del reporte

2. **Asignado A**
   - Avatar, nombre, rol y departamento del responsable

3. **Ubicación**
   - Espacio (Aula, Laboratorio, etc.)
   - Piso/Planta
   - Detalle adicional si existe

4. **Estado y Evaluación**
   - **Estado**: Abierto, En Proceso, Pausado, Resuelto, Cerrado, Cancelado
   - **Prioridad**: Baja, Media, Alta, Crítica
   - **Impacto**: Bajo, Medio, Alto
   - **Complejidad**: 1-10 con barra visual
   - **Fechas**: Creación y última actualización

5. **Descripción del Problema**
   - Texto completo con preservación de saltos de línea

### Colores por Estados

| Estado | Color | Hex |
|--------|-------|-----|
| Crítica/Alta | Rojo | #D31219 |
| Media | Oro | #B28A12 |
| Baja | Verde | #2D8A3C |
| Pausado/Neutral | Gris | #6B7280 |
| Resuelto | Verde | #2D8A3C |
| Cerrado | Negro | #000000 |

## Ciclo de Vida de un Reporte

```
ABIERTO
   ↓
EN_PROCESO ← PAUSADO ← EN_PROCESO
   ↓
RESUELTO
   ↓
CERRADO

Alternativa: ABIERTO → CANCELADO (en cualquier momento)
```

## Componentes Utilizados

### De shadcn/ui
- Button
- Card / CardContent / CardHeader / CardTitle
- Avatar / AvatarFallback
- Badge
- Input
- Textarea
- Select
- Tabs / TabsContent / TabsList / TabsTrigger
- Progress
- Separator
- Table

### De lucide-react
- Search, Bell, Settings, AlertTriangle, Clock, CheckCircle2, ChevronRight
- Filter, User, Plus, MapPin, AlertCircle, Weight, Upload, X, ArrowLeft

## Integración con API (Próxima Fase)

### Endpoints Necesarios

#### POST `/api/reports`
Crear nuevo reporte
```json
{
  "title": "...",
  "description": "...",
  "floor": "...",
  "space": "...",
  "priority": "ALTA",
  "impact": "MEDIO",
  "weight": 7,
  "tags": ["Infraestructura"],
  "attachments": [File, File]
}
```

#### GET `/api/reports/:id`
Obtener detalle de reporte

#### PUT `/api/reports/:id`
Actualizar estado, asignación, etc.

#### GET `/api/reports/:id/history`
Obtener historial de cambios

## Extensibilidad

### Agregar nuevas opciones de Piso
Modificar `FLOOR_OPTIONS` en `/components/forms/create-report-form.tsx`

### Agregar nuevas categorías
Modificar `AVAILABLE_TAGS` en el mismo archivo

### Agregar nuevos espacios
Modificar `SPACE_OPTIONS`

### Agregar nuevas subtabs
- Crear nuevo archivo en `/components/task/tabs/`
- Agregar TabsTrigger y TabsContent en `task-detail-view.tsx`

## Notas de Diseño

- Sigue la paleta de colores de Universidad Libre
- Mobile-first, responsive
- Accesibilidad con aria-labels y sr-only
- Validación en tiempo real en formulario
- Estado visual claro para cada sección
- Iconografía consistente

## Próximos Pasos

1. Conectar formulario a API backend
2. Implementar autenticación de usuario
3. Agregar búsqueda y filtrado avanzado
4. Implementar notificaciones en tiempo real
5. Agregar reportes y analytics
6. Integrar sistema de comentarios
