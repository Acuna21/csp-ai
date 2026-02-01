# Sistema de Tipos TypeScript - Universidad Libre

## Descripción General

Este directorio contiene el sistema completo de tipos TypeScript para la aplicación de reportes universitarios de la Universidad Libre. Está diseñado para proporcionar seguridad de tipos, validación y estructura en toda la aplicación.

## Estructura de Archivos

### `index.ts` - Tipos Principales

Contiene todas las interfaces y tipos principales organizados por dominio:

#### Dominios Principales

1. **Tipos de Utilidad General**
   - `UUID`, `Email`, `PhoneNumber`, `Timestamp`
   - `PageMeta`, `PaginatedResponse<T>`, `ApiResponse<T>`

2. **Enums y Constantes**
   - `ReportCriticality`: CRITICAL, MEDIUM, LOW
   - `ReportStatus`: PENDING, IN_PROGRESS, ON_HOLD, COMPLETED, REJECTED
   - `ReportCategory`: ENROLLMENT, CERTIFICATE, GRADES, INFRASTRUCTURE, FINANCIAL, OTHER
   - `UserRole`: STUDENT, WORKER, ADMIN, COORDINATOR
   - `AlertType`: CRITICAL_REPORTS, EXPIRING_REPORTS, COMPLETED_REPORTS, SYSTEM_NOTICE

3. **Configuración de Diseño**
   - `CriticalityConfig`: Mapeos de color y estilos por criticidad
   - `ColorPalette`: Paleta completa del sistema
   - `CRITICALITY_CONFIG`: Constante con configuraciones predefinidas

4. **Entidades Principales**
   - `User`: Interfaz base para usuarios
   - `Worker`: Extiende User con capacidades de coordinador
   - `Student`: Extiende User con información académica
   - `Report`: Estructura completa de reportes
   - `ReportWithStudent`: Report con información del estudiante incluida

5. **Búsqueda y Filtrado**
   - `ReportFilter`: Opciones de filtrado avanzado
   - `ReportStats`: Estadísticas agregadas
   - `SearchQuery`, `SearchResult`: Búsqueda global

6. **Tablero y Actividad**
   - `WorkerDashboard`: Vista completa del coordinador
   - `Activity`: Registro de actividades del sistema
   - `Alert`: Alertas del sistema
   - `Notification`: Notificaciones a usuarios

7. **Comentarios y Notas**
   - `Comment`: Comentarios públicos/internos en reportes
   - `ReportNote`: Notas privadas del coordinador

8. **Configuración**
   - `WorkerSettings`: Preferencias personales del coordinador
   - `SystemSettings`: Configuración global del sistema
   - `NotificationPreferences`: Preferencias de notificaciones

### `constants.ts` - Constantes y Mapeos

Valores predefinidos y mapeos utilizados en toda la aplicación:

```typescript
// Etiquetas de display
REPORT_STATUS_LABELS: Record<ReportStatus, string>
REPORT_CATEGORY_LABELS: Record<ReportCategory, string>
USER_ROLE_LABELS: Record<UserRole, string>

// Colores por estado
REPORT_STATUS_COLORS: Record<ReportStatus, ColorConfig>

// Opciones de selección
REPORT_STATUS_OPTIONS: { value, label }[]
REPORT_CATEGORY_OPTIONS: { value, label }[]

// Límites y umbrales
LIMITS: { MAX_REPORTS_PER_WORKER, MAX_FILE_SIZE_MB, ... }
TIME_THRESHOLDS: { CRITICAL_HOURS, WARNING_HOURS, ... }

// Mensajes del sistema
MESSAGES: { SUCCESS, ERROR, CONFIRMATION, ... }

// Rutas
ROUTES: { HOME, WORKER_DASHBOARD, REPORTS, ... }

// Configuración de tabla
TABLE_CONFIG: { ROWS_PER_PAGE_OPTIONS, DEFAULT_ROWS_PER_PAGE, ... }
```

### `validators.ts` - Funciones de Validación

Validadores y utilidades para verificación de tipos:

#### Validadores de Entrada
```typescript
validateEmail(email: string): email is Email
validatePassword(password: string): { isValid, errors }
validateReport(data: CreateReportFormData): { isValid, errors }
validateReportProgress(progress: number): { isValid, message }
validateWorkerSettings(data: UpdateWorkerSettingsFormData): { isValid, errors }
```

#### Type Guards (Guardias de Tipo)
```typescript
isWorker(user: User): user is Worker
isStudent(user: User): user is Student
isAdmin(user: User): boolean
isValidReportStatus(status: unknown): status is ReportStatus
isValidReportCriticality(criticality: unknown): criticality is ReportCriticality
```

#### Utilidades de Estado
```typescript
canTransitionStatus(from: ReportStatus, to: ReportStatus): boolean
isReportOverdue(dueDate: number): boolean
isReportCriticallyLate(dueDate: number): boolean
getTimeAgoString(timestamp: number): string
```

#### Filtrado y Búsqueda
```typescript
filterReportsByStatus(reports: Report[], statuses: ReportStatus[]): Report[]
filterReportsByCriticality(reports: Report[], criticalities: ReportCriticality[]): Report[]
searchReports(reports: Report[], query: string, searchIn?: (keyof Report)[]): Report[]
```

## Ejemplos de Uso

### Crear un Nuevo Reporte

```typescript
import { CreateReportFormData, validateReport } from '@/lib/types'
import { formatErrorsToObject } from '@/lib/types/validators'

const formData: CreateReportFormData = {
  title: "Problema con matrícula",
  description: "No puedo registrar mi matrícula del semestre",
  category: "enrollment",
  dueDate: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
}

const { isValid, errors } = validateReport(formData)
if (!isValid) {
  const formErrors = formatErrorsToObject(errors)
  // Mostrar errores en el formulario
}
```

### Validar Tipo de Usuario

```typescript
import { isWorker, isStudent } from '@/lib/types/validators'
import { User } from '@/lib/types'

function handleUserAction(user: User) {
  if (isWorker(user)) {
    // user es de tipo Worker
    console.log(user.assignedCategories)
  } else if (isStudent(user)) {
    // user es de tipo Student
    console.log(user.studentId)
  }
}
```

### Filtrar y Buscar Reportes

```typescript
import { 
  filterReportsByStatus, 
  filterReportsByCriticality,
  searchReports 
} from '@/lib/types/validators'
import { ReportStatus, ReportCriticality } from '@/lib/types'

const reports = [...] // Array de reportes

// Filtrar por estado
const pendingReports = filterReportsByStatus(reports, [ReportStatus.PENDING])

// Filtrar por criticidad
const criticalReports = filterReportsByCriticality(reports, [
  ReportCriticality.CRITICAL,
  ReportCriticality.MEDIUM
])

// Buscar por texto
const results = searchReports(reports, "matrícula", ["title", "description"])
```

### Verificar Transición de Estado

```typescript
import { canTransitionStatus } from '@/lib/types/validators'
import { ReportStatus } from '@/lib/types'

const canUpdate = canTransitionStatus(
  ReportStatus.PENDING,
  ReportStatus.IN_PROGRESS
) // true

const canReject = canTransitionStatus(
  ReportStatus.COMPLETED,
  ReportStatus.REJECTED
) // false
```

### Usar Mapeos de Constantes

```typescript
import { 
  REPORT_STATUS_LABELS,
  REPORT_CATEGORY_LABELS,
  CRITICALITY_CONFIG 
} from '@/lib/types/constants'
import { ReportStatus, ReportCriticality, ReportCategory } from '@/lib/types'

// Obtener etiqueta para display
const statusLabel = REPORT_STATUS_LABELS[ReportStatus.IN_PROGRESS] // "En Progreso"
const categoryLabel = REPORT_CATEGORY_LABELS[ReportCategory.ENROLLMENT] // "Problema con Matrícula"

// Obtener configuración de color
const config = CRITICALITY_CONFIG[ReportCriticality.CRITICAL]
console.log(config.color) // "#D31219"
console.log(config.bgColor) // "rgba(211, 18, 25, 0.1)"
```

## Integración con el Sistema de Diseño

El sistema de tipos está completamente alineado con el sistema de diseño de la Universidad Libre:

### Colores
- **Primario**: #D31219 (Rojo Universidad Libre)
- **Secundario**: #000000 (Negro)
- **Acento**: #B28A12 (Oro)
- **Éxito**: #2D8A3C (Verde)

### Tipografía
- **Escala**: Major Second (1.125)
- **Grid**: 8px

### Enums de Criticidad
Mapeados directamente a los colores del sistema:

```typescript
const CRITICALITY_CONFIG = {
  critical: { color: "#D31219", ... },  // Rojo (error)
  medium: { color: "#B28A12", ... },    // Oro (warning)
  low: { color: "#2D8A3C", ... },       // Verde (success)
}
```

## Guías de Mejores Prácticas

### 1. Siempre Usar Type Guards

```typescript
// ❌ Incorrecto
const worker = user as Worker
console.log(worker.assignedCategories) // Puede error en runtime

// ✅ Correcto
if (isWorker(user)) {
  console.log(user.assignedCategories) // TypeScript verifica
}
```

### 2. Validar Entrada Temprano

```typescript
// ❌ Evitar
const report = createReport(formData) // Puede fallar después

// ✅ Mejor
const validation = validateReport(formData)
if (!validation.isValid) {
  const errors = formatErrorsToObject(validation.errors)
  // Manejar errores
} else {
  const report = createReport(formData)
}
```

### 3. Usar Constantes en lugar de Strings Mágicos

```typescript
// ❌ Evitar
if (report.status === "completed") { ... }

// ✅ Correcto
if (report.status === ReportStatus.COMPLETED) { ... }

// ✅ Mejor para display
const label = REPORT_STATUS_LABELS[report.status]
```

### 4. Reutilizar Tipos Existentes

```typescript
// ✅ Correcto - reutilizar tipos existentes
interface ReportTableProps {
  reports: ReportWithStudent[]
  onRowClick: (reportId: UUID) => void
}
```

### 5. Usar DeepPartial para Actualizaciones Parciales

```typescript
interface ReportUpdateInput = DeepPartial<Report>

function updateReport(id: UUID, data: ReportUpdateInput) {
  // Solo actualiza los campos que se pasaron
}
```

## Extensión del Sistema de Tipos

Para agregar nuevos tipos:

1. **Añadir al enum correcto** en `index.ts`
2. **Agregar label** en `constants.ts`
3. **Crear validador** en `validators.ts` si es necesario
4. **Documentar** con comentarios JSDoc

Ejemplo:

```typescript
// 1. En index.ts
export enum ReportCategory {
  // ... existing
  ACADEMIC_APPEAL = "academic_appeal",
}

// 2. En constants.ts
export const REPORT_CATEGORY_LABELS: Record<ReportCategory, string> = {
  // ... existing
  academic_appeal: "Apelación Académica",
}

// 3. En validators.ts
export function validateReportCategory(
  category: unknown
): category is ReportCategory {
  return Object.values(ReportCategory).includes(category as ReportCategory);
}
```

## Recursos Relacionados

- **Sistema de Diseño**: `/app/design-system/page.tsx`
- **Estilos Globales**: `/app/globals.css`
- **Componentes UI**: `/components/ui/`
- **Vista de Worker**: `/components/home/worker-home-view.tsx`

## Preguntas Frecuentes

### ¿Por qué usar branded types como UUID y Email?

Los branded types proporcionan seguridad de tipos adicional. Previenen confundir strings regulares con UUIDs o emails:

```typescript
function getUserById(id: UUID) { ... }

const id = "abc-123" // string
const uuid = "abc-123" as UUID // UUID

getUserById(id) // ❌ Error TypeScript
getUserById(uuid) // ✅ Ok
```

### ¿Cómo manejar estados que no están en ReportStatus?

Los reportes solo pueden estar en los estados definidos. Si necesitas un nuevo estado, agrégalo al enum y mantén sincronizado con la base de datos y validaciones.

### ¿Puedo modificar las interfaces?

Sí, pero asegúrate de:
1. Actualizar todas las referencias
2. Realizar migraciones de datos si es necesario
3. Actualizar componentes que las utilizan
4. Documentar el cambio

---

**Versión**: 1.0.0  
**Última actualización**: 2024  
**Mantenedor**: Equipo de Desarrollo
