# Panel de Administración - Documentación Completa

## Descripción General

El panel de administración permite a los administradores del sistema gestionar toda la configuración de parámetros del sistema de reportes de la Universidad Libre.

## Estructura del Panel

### 1. Dashboard Administrativo (`/admin`)
- Resumen estadístico de configuraciones
- Acceso rápido a todas las secciones
- Vista de métricas generales del sistema

### 2. Secciones de Configuración

#### A. Sitios y Lugares (`/admin/locations`)
**Propósito:** Gestionar los espacios físicos donde se reportan incidencias

**Campos:**
- Nombre del sitio (Ej: "Aula 301")
- Piso (Número de piso)
- Edificio (Opcional)

**Funcionalidades:**
- Crear nuevos sitios
- Editar sitios existentes
- Eliminar sitios

---

#### B. Áreas (`/admin/areas`)
**Propósito:** Definir las áreas administrativas responsables de resolver incidencias

**Campos:**
- Nombre del Área (Ej: "Infraestructura", "Académica")
- Descripción (propósito y responsabilidades)

**Funcionalidades:**
- Crear áreas personalizadas
- Editar información de áreas
- Eliminar áreas

**Ejemplo de Áreas Predeterminadas:**
- Infraestructura - Problemas de instalaciones y equipos
- Académica - Asuntos de calificaciones y matrículas
- Administrativo - Trámites administrativos

---

#### C. Trabajadores (`/admin/workers`)
**Propósito:** Crear y gestionar cuentas de coordinadores y trabajadores

**Campos:**
- Nombre completo
- Email
- Área de trabajo
- Teléfono

**Funcionalidades:**
- Crear nuevas cuentas de trabajadores
- Editar información de trabajadores
- Eliminar cuentas
- Asignar a áreas específicas

---

#### D. Jefes de Áreas (`/admin/area-heads`)
**Propósito:** Asignar trabajadores como jefes responsables de cada área

**Campos:**
- Área (Select dropdown)
- Trabajador responsable (Select dropdown)

**Funcionalidades:**
- Asignar jefes a áreas
- Cambiar jefe de un área
- Ver asignaciones actuales

---

#### E. Tags (`/admin/tags`)
**Propósito:** Crear etiquetas personalizadas para clasificar incidencias

**Campos:**
- Nombre del tag
- Color (color picker)

**Funcionalidades:**
- Crear tags nuevos
- Personalizar colores
- Eliminar tags obsoletos
- Uso en filtros y búsquedas

**Ejemplos de Tags:**
- Urgente
- Mantenimiento
- Infraestructura
- Académico

---

#### F. Criticidad (`/admin/criticality`)
**Propósito:** Definir niveles de criticidad de las incidencias

**Campos:**
- Nombre del nivel (Ej: "Alta", "Media", "Baja")
- Nivel numérico (1-5)
- Color (identificación visual)
- Descripción

**Funcionalidades:**
- Crear niveles personalizados
- Asignar colores
- Definir descripciones
- Organizar por nivel de prioridad

**Niveles Predeterminados:**
1. **Baja** - Problema menor sin impacto operativo
2. **Media** - Problema moderado con impacto limitado
3. **Alta** - Problema grave que requiere atención urgente
4. **Crítica** - Emergencia que compromete operaciones

---

#### G. Estados de Tareas (`/admin/task-states`)
**Propósito:** Configurar los estados por los que puede pasar una incidencia

**Campos:**
- Nombre del estado
- Color (para identificación visual)
- Descripción

**Funcionalidades:**
- Crear estados personalizados
- Asignar colores diferenciadores
- Eliminar estados
- Definir flujos de trabajo

**Estados Predeterminados:**
1. **Abierto** - Incidencia reportada pero no asignada
2. **En Proceso** - Incidencia en resolución
3. **Pausado** - Incidencia en espera
4. **Resuelto** - Incidencia resuelta
5. **Cerrado** - Incidencia cerrada

---

#### H. Pesos de Incidencias (`/admin/weights`)
**Propósito:** Configurar factores que calculan la complejidad de una incidencia

**Campos:**
- Factor (Ej: "Daño Material", "Tiempo de Respuesta")
- Valor/Peso (1-10)
- Descripción

**Funcionalidades:**
- Crear factores de complejidad
- Ajustar pesos con slider
- Eliminar factores
- Visualizar pesos en progreso

**Factores Predeterminados:**
- Daño Material (3/10)
- Tiempo de Respuesta (5/10)
- Número de Afectados (4/10)
- Seguridad (5/10)

---

## Navegación

### Sidebar Principal
El panel de administración incluye una barra lateral fija (en desktop) que permite acceso directo a:
- Dashboard
- Sitios/Lugares
- Áreas
- Trabajadores
- Jefes de Áreas
- Tags
- Criticidad
- Estados de Tareas
- Pesos de Incidencias

### Responsive Design
- **Mobile:** Sidebar colapsable
- **Tablet:** Sidebar parcialmente visible
- **Desktop:** Sidebar fijo de 256px

---

## Flujo de Trabajo Recomendado

1. **Iniciar Configuración:**
   - Crear Áreas primero
   - Crear Sitios/Lugares
   - Definir Criticidad
   - Configurar Estados

2. **Agregar Usuarios:**
   - Crear Trabajadores
   - Asignar a Áreas
   - Designar Jefes de Área

3. **Personalización:**
   - Crear Tags según necesidades
   - Configurar Pesos de Incidencias
   - Ajustar Colores y Descripción

---

## Permiso de Acceso

⚠️ **Nota:** El acceso al panel de administración debe estar protegido mediante:
- Autenticación de usuario
- Verificación de rol (solo ADMIN)
- Middleware de protección en rutas

---

## Rutas del Panel

```
/admin                      - Dashboard
/admin/locations           - Gestión de sitios
/admin/areas               - Gestión de áreas
/admin/workers             - Gestión de trabajadores
/admin/area-heads          - Asignación de jefes
/admin/tags                - Gestión de tags
/admin/criticality         - Gestión de criticidad
/admin/task-states         - Gestión de estados
/admin/weights             - Gestión de pesos
```

---

## Datos Persistentes

⚠️ **Estado Actual:** Los datos están en estado (localStorage simulado)

**Para producción necesita:**
- Integración con base de datos (Supabase/Neon)
- API endpoints para CRUD
- Validación en servidor
- Auditoría de cambios
- Historial de modificaciones

---

## Estilos y Diseño

- **Color Primario:** #D31219 (Rojo Universidad Libre)
- **Color Secundario:** #B28A12 (Oro)
- **Color Éxito:** #2D8A3C (Verde)
- **Color Neutro:** #6B7280 (Gris)

Todos los colores son configurables desde el panel mismo.
