# Guía de Implementación - Sistema de Tipos TypeScript

## 📋 Resumen Ejecutivo

Se ha creado un sistema completo de tipos TypeScript para la aplicación de reportes universitarios de la Universidad Libre. Este sistema proporciona seguridad de tipos, validación, y estructura en toda la aplicación, alineado perfectamente con el sistema de diseño existente.

## 📁 Archivos Creados

### 1. `/lib/types/index.ts` (455 líneas)
**Archivo principal con todas las interfaces y tipos**

Contenido:
- Tipos de utilidad general (UUID, Email, Timestamp, etc.)
- Enums para estados, categorías, roles y tipos de alerta
- Configuración de diseño y colores
- Entidades principales (User, Worker, Student, Report)
- Filtrado y búsqueda
- Dashboard y componentes
- Comentarios y notas
- Configuración del usuario

**Usar para:**
```typescript
import { Report, ReportStatus, User, UUID } from '@/lib/types'
```

---

### 2. `/lib/types/constants.ts` (263 líneas)
**Mapeos, etiquetas y valores constantes del sistema**

Contenido:
- Mapeos de etiquetas (status → "En Progreso")
- Mapeos de colores por estado
- Listas de opciones para formularios
- Límites y umbrales del sistema
- Mensajes del sistema (éxito, error, confirmación)
- Rutas de la aplicación
- Patrones de validación regex
- Configuración de tablas

**Usar para:**
```typescript
import { REPORT_STATUS_LABELS, CRITICALITY_CONFIG, LIMITS } from '@/lib/types/constants'

// Obtener etiqueta
const label = REPORT_STATUS_LABELS[ReportStatus.PENDING] // "Pendiente"

// Obtener configuración de color
const config = CRITICALITY_CONFIG[ReportCriticality.CRITICAL] // { color: "#D31219", ... }
```

---

### 3. `/lib/types/validators.ts` (433 líneas)
**Funciones de validación y type guards**

Contenido:
- Validadores de email y contraseña
- Validadores de reportes
- Type guards (isWorker, isStudent, etc.)
- Validadores de estado y transiciones
- Filtrado y búsqueda
- Utilidades de tiempo y formato

**Usar para:**
```typescript
import { validateReport, isWorker, canTransitionStatus } from '@/lib/types/validators'

// Validar formulario
const { isValid, errors } = validateReport(formData)

// Type guard
if (isWorker(user)) {
  console.log(user.assignedCategories)
}

// Verificar transición de estado
const canUpdate = canTransitionStatus(ReportStatus.PENDING, ReportStatus.IN_PROGRESS)
```

---

### 4. `/lib/types/api.ts` (492 líneas)
**Tipos para respuestas API y comunicación con servidor**

Contenido:
- Requests y responses de autenticación
- Requests y responses de reportes
- Requests y responses de usuarios
- Dashboard API
- Búsqueda API
- Comentarios y notificaciones API
- Archivos y asignación
- Estadísticas
- Errores estándar

**Usar para:**
```typescript
import { LoginRequest, CreateReportResponse, GetReportsResponse } from '@/lib/types/api'

// En un server action
export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  // ...
}
```

---

### 5. `/lib/types/README.md` (388 líneas)
**Documentación completa del sistema de tipos**

Contenido:
- Descripción general
- Estructura de archivos
- Ejemplos de uso
- Integración con sistema de diseño
- Guías de mejores prácticas
- Cómo extender el sistema
- Preguntas frecuentes

---

### 6. `/lib/types/IMPLEMENTATION.md` (Este archivo)
**Guía práctica de implementación**

---

## 🎯 Características Principales

### ✅ Seguridad de Tipos
- Branded types (UUID, Email) para mayor precisión
- Type guards completos
- Enums en lugar de strings mágicos

### ✅ Validación Completa
- Validadores para toda entrada de usuario
- Mapeos de errores a formularios
- Reglas de transición de estado

### ✅ Alineación con Diseño
```
Colores mapeados directamente:
- Criticidad CRITICAL → #D31219 (Rojo UL)
- Criticidad MEDIUM → #B28A12 (Oro)
- Criticidad LOW → #2D8A3C (Verde)

Estados con transiciones válidas:
- PENDING → IN_PROGRESS, REJECTED
- IN_PROGRESS → ON_HOLD, COMPLETED, REJECTED
- ON_HOLD → IN_PROGRESS, REJECTED
- COMPLETED → (sin transiciones)
- REJECTED → PENDING
```

### ✅ Documentación Completa
- Ejemplos de código para cada caso
- Guías de mejores prácticas
- Preguntas frecuentes respondidas

---

## 🚀 Cómo Usar

### Importaciones Comunes

```typescript
// Tipos principales
import { 
  Report, 
  ReportStatus, 
  ReportCriticality,
  User,
  Worker,
  UUID 
} from '@/lib/types'

// Constantes
import { 
  REPORT_STATUS_LABELS,
  CRITICALITY_CONFIG,
  ROUTES 
} from '@/lib/types/constants'

// Validadores
import { 
  validateReport,
  isWorker,
  canTransitionStatus,
  formatErrorsToObject 
} from '@/lib/types/validators'

// API
import { 
  GetReportsResponse,
  CreateReportResponse 
} from '@/lib/types/api'
```

### Ejemplo 1: Crear Componente Tipado

```typescript
import { Report, ReportWithStudent } from '@/lib/types'
import { REPORT_STATUS_LABELS, CRITICALITY_CONFIG } from '@/lib/types/constants'

interface ReportCardProps {
  report: ReportWithStudent
  onSelect?: (id: UUID) => void
}

export function ReportCard({ report, onSelect }: ReportCardProps) {
  const statusLabel = REPORT_STATUS_LABELS[report.status]
  const criticityConfig = CRITICALITY_CONFIG[report.criticality]
  
  return (
    <div 
      style={{ 
        borderLeftColor: criticityConfig.color,
        backgroundColor: criticityConfig.bgColor 
      }}
      onClick={() => onSelect?.(report.id)}
    >
      <h3>{report.title}</h3>
      <p>{report.student.firstName} {report.student.lastName}</p>
      <span>{statusLabel}</span>
    </div>
  )
}
```

### Ejemplo 2: Validar Formulario

```typescript
import { validateReport, formatErrorsToObject } from '@/lib/types/validators'
import { CreateReportFormData } from '@/lib/types'

async function handleSubmit(formData: CreateReportFormData) {
  const { isValid, errors } = validateReport(formData)
  
  if (!isValid) {
    const formErrors = formatErrorsToObject(errors)
    setErrors(formErrors)
    return
  }
  
  await createReport(formData)
}
```

### Ejemplo 3: Filtrar Reportes

```typescript
import { filterReportsByStatus, isReportOverdue } from '@/lib/types/validators'
import { ReportStatus } from '@/lib/types'

function getDashboardView(reports: Report[]) {
  const pending = filterReportsByStatus(reports, [ReportStatus.PENDING])
  const overdue = pending.filter(r => isReportOverdue(r.dueDate))
  
  return { pending, overdue }
}
```

### Ejemplo 4: Type Guards

```typescript
import { isWorker, isStudent } from '@/lib/types/validators'
import { User } from '@/lib/types'

function getPermissions(user: User) {
  if (isWorker(user)) {
    // TypeScript sabe que user es Worker
    return {
      canAssignReports: true,
      assignedCategories: user.assignedCategories
    }
  }
  
  if (isStudent(user)) {
    // TypeScript sabe que user es Student
    return {
      canViewOwn: true,
      studentId: user.studentId
    }
  }
}
```

---

## 📊 Estructura de Tipos en Relación con Componentes

```
/app/worker/page.tsx (página)
  └─ /components/home/worker-home-view.tsx (componente)
      ├─ Report[] (tabla de reportes)
      ├─ Alert[] (sección de alertas)
      ├─ WorkerDashboard (datos principales)
      └─ ReportStats (estadísticas)

Tipos relacionados:
  - Report: Estructura de datos del reporte
  - ReportWithStudent: Report + Student (para mostrar)
  - Alert: Alertas del sistema
  - WorkerDashboard: Todo lo anterior junto
  - CRITICALITY_CONFIG: Colores y estilos
```

---

## 🔄 Flujo de Datos Típico

```
1. Usuario completa formulario
   └─ FormData (HTML input values)

2. Validar con validateReport()
   └─ ValidationError[] o isValid: true

3. Si error, formatear con formatErrorsToObject()
   └─ FormErrors para mostrar en UI

4. Si válido, crear CreateReportRequest
   └─ CreateReportFormData

5. Enviar a servidor como LoginRequest
   └─ API response: CreateReportResponse

6. Usar CreateReportResponse.data: Report
   └─ Mostrar en interfaz
```

---

## 🔧 Extensiones Comunes

### Agregar Nuevo Estado de Reporte

```typescript
// 1. En index.ts
export enum ReportStatus {
  // ... existentes
  IN_REVIEW = "in_review",
}

// 2. En constants.ts
export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  // ... existentes
  in_review: "En Revisión",
}

export const REPORT_STATUS_COLORS = {
  // ... existentes
  in_review: {
    bg: "rgba(59, 130, 246, 0.1)",
    text: "#3B82F6",
    border: "rgba(59, 130, 246, 0.2)",
  }
}

// 3. En validators.ts
export function canTransitionStatus(...) {
  const validTransitions: Record<ReportStatus, ReportStatus[]> = {
    // ... existentes
    [ReportStatus.IN_PROGRESS]: [
      ReportStatus.IN_REVIEW, // ← nuevo
      // ... resto
    ]
    [ReportStatus.IN_REVIEW]: [
      ReportStatus.COMPLETED,
      ReportStatus.REJECTED,
    ]
  }
  // ...
}
```

### Agregar Nueva Categoría

```typescript
// 1. En index.ts
export enum ReportCategory {
  // ... existentes
  LIBRARY_RESOURCES = "library_resources",
}

// 2. En constants.ts
export const REPORT_CATEGORY_LABELS = {
  // ... existentes
  library_resources: "Recursos de Biblioteca",
}

export const REPORT_CATEGORY_ICONS = {
  // ... existentes
  library_resources: "BookMarked",
}
```

---

## ✨ Mejores Prácticas Implementadas

### 1. Single Source of Truth
Mapeos y configuraciones en un solo lugar (constants.ts) para evitar desincronización.

### 2. Type Safety
Branded types y type guards previenen errores comunes en runtime.

### 3. Validación Temprana
Validadores disponibles antes de enviar datos al servidor.

### 4. DRY (Don't Repeat Yourself)
Constantes reutilizables en toda la aplicación.

### 5. Documentación Embedida
Comentarios JSDoc en interfaces importantes.

### 6. Escalabilidad
Estructura clara para agregar nuevos tipos sin afectar existentes.

---

## 🎓 Recursos de Aprendizaje

### Para Principiantes
- Comienza con `README.md`
- Revisa ejemplos en sección "Ejemplos de Uso"
- Estudia type guards en `validators.ts`

### Para Desarrolladores Avanzados
- Explora branded types en `index.ts`
- Comprende transiciones de estado en `validators.ts`
- Analiza respuestas API en `api.ts`

### Para Diseñadores/PM
- Mira mapeos de colores en `constants.ts`
- Comprende flujo de criticidades
- Estudia iconografía en REPORT_CATEGORY_ICONS

---

## 🐛 Troubleshooting

### "Type 'string' is not assignable to type 'UUID'"
**Solución:** Use branded types correctamente
```typescript
const id = userId as UUID // ✅ Correcto
// o
const uuid: UUID = userId // ✅ Correcto
```

### "Object is of type 'unknown'"
**Solución:** Use type guards
```typescript
if (isWorker(user)) { // ✅ TypeScript type narrows
  console.log(user.assignedCategories)
}
```

### "Cannot read property of undefined"
**Solución:** Valide antes de usar
```typescript
const { isValid, errors } = validateReport(data)
if (isValid) {
  // Ahora es seguro usar data
}
```

---

## 📈 Próximos Pasos

1. **Integrar con Componentes**: Actualizar componentes existentes para usar tipos
2. **Crear Hooks Tipados**: Crear hooks para manejo de estado con tipos
3. **API Layer**: Implementar funciones de API client con tipos completos
4. **Testing**: Crear tests para validadores y type guards
5. **Documentación**: Agregar ejemplos en comments JSDoc

---

## 📞 Soporte

- **Preguntas**: Ver FAQ en README.md
- **Extensiones**: Seguir guía en sección "Extensión del Sistema"
- **Bugs**: Revisar tipos en orden: index.ts → constants.ts → validators.ts

---

**Versión**: 1.0.0  
**Fecha**: 2024  
**Status**: ✅ Completo y Listo para Usar
