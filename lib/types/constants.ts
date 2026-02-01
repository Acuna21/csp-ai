/**
 * CONSTANTES DEL SISTEMA
 * Valores y mapeos predefinidos para toda la aplicación
 */

import {
  ReportCriticality,
  ReportStatus,
  ReportCategory,
  UserRole,
  AlertType,
  CriticalityConfigMap,
} from "./index";

// ============================================================
// MAPEOS DE ETIQUETAS Y DISPLAY
// ============================================================

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  pending: "Pendiente",
  in_progress: "En Progreso",
  on_hold: "En Espera",
  completed: "Completado",
  rejected: "Rechazado",
};

export const REPORT_STATUS_COLORS: Record<
  ReportStatus,
  { bg: string; text: string; border: string }
> = {
  pending: {
    bg: "rgba(211, 18, 25, 0.1)",
    text: "#D31219",
    border: "rgba(211, 18, 25, 0.2)",
  },
  in_progress: {
    bg: "rgba(178, 138, 18, 0.1)",
    text: "#B28A12",
    border: "rgba(178, 138, 18, 0.2)",
  },
  on_hold: {
    bg: "rgba(107, 114, 128, 0.1)",
    text: "#6B7280",
    border: "rgba(107, 114, 128, 0.2)",
  },
  completed: {
    bg: "rgba(45, 138, 60, 0.1)",
    text: "#2D8A3C",
    border: "rgba(45, 138, 60, 0.2)",
  },
  rejected: {
    bg: "rgba(239, 68, 68, 0.1)",
    text: "#EF4444",
    border: "rgba(239, 68, 68, 0.2)",
  },
};

export const REPORT_CATEGORY_LABELS: Record<ReportCategory, string> = {
  enrollment: "Problema con Matrícula",
  certificate: "Solicitud de Certificado",
  grades: "Actualización de Notas",
  infrastructure: "Queja de Infraestructura",
  financial: "Asunto Financiero",
  other: "Otro",
};

export const REPORT_CATEGORY_ICONS: Record<ReportCategory, string> = {
  enrollment: "BookOpen",
  certificate: "FileText",
  grades: "BarChart3",
  infrastructure: "Building2",
  financial: "CreditCard",
  other: "HelpCircle",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  student: "Estudiante",
  worker: "Coordinador",
  coordinator: "Coordinador Senior",
  admin: "Administrador",
};

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
  critical_reports: "Reportes Críticos",
  expiring_reports: "Reportes por Vencer",
  completed_reports: "Reportes Completados",
  system_notice: "Aviso del Sistema",
};

export const ALERT_TYPE_SEVERITY: Record<
  AlertType,
  "info" | "warning" | "critical"
> = {
  critical_reports: "critical",
  expiring_reports: "warning",
  completed_reports: "info",
  system_notice: "info",
};

// ============================================================
// LISTAS SELECCIONABLES
// ============================================================

export const REPORT_STATUS_OPTIONS = Object.values(ReportStatus).map(
  (status) => ({
    value: status,
    label: REPORT_STATUS_LABELS[status],
  })
);

export const REPORT_CATEGORY_OPTIONS = Object.values(ReportCategory).map(
  (category) => ({
    value: category,
    label: REPORT_CATEGORY_LABELS[category],
  })
);

export const REPORT_CRITICALITY_OPTIONS = Object.values(ReportCriticality).map(
  (criticality) => ({
    value: criticality,
    label: criticality.charAt(0).toUpperCase() + criticality.slice(1),
  })
);

export const USER_ROLE_OPTIONS = Object.values(UserRole).map((role) => ({
  value: role,
  label: USER_ROLE_LABELS[role],
}));

// ============================================================
// LÍMITES Y UMBRALES
// ============================================================

export const LIMITS = {
  MAX_REPORTS_PER_WORKER: 20,
  MAX_ATTACHMENTS_PER_REPORT: 10,
  MAX_FILE_SIZE_MB: 50,
  MAX_COMMENT_LENGTH: 5000,
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 10000,
  MIN_PASSWORD_LENGTH: 8,
  PAGE_SIZE_DEFAULT: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const TIME_THRESHOLDS = {
  CRITICAL_HOURS: 4,
  WARNING_HOURS: 24,
  AUTO_REFRESH_INTERVAL_SECONDS: 30,
} as const;

// ============================================================
// MENSAJES DEL SISTEMA
// ============================================================

export const MESSAGES = {
  SUCCESS: {
    REPORT_CREATED: "Reporte creado exitosamente",
    REPORT_UPDATED: "Reporte actualizado exitosamente",
    REPORT_DELETED: "Reporte eliminado exitosamente",
    SETTINGS_SAVED: "Configuraciones guardadas",
    PROFILE_UPDATED: "Perfil actualizado exitosamente",
  },
  ERROR: {
    GENERIC: "Algo salió mal. Por favor intente de nuevo.",
    NETWORK: "Error de conexión. Verifique su conexión a internet.",
    UNAUTHORIZED: "No autorizado. Por favor inicie sesión nuevamente.",
    FORBIDDEN: "No tiene permisos para esta acción.",
    NOT_FOUND: "Recurso no encontrado.",
    VALIDATION: "Por favor corrija los errores en el formulario.",
    SERVER_ERROR: "Error del servidor. Intente más tarde.",
  },
  CONFIRMATION: {
    DELETE_REPORT: "¿Está seguro de que desea eliminar este reporte?",
    LEAVE_PAGE: "Tiene cambios sin guardar. ¿Desea salir de todas formas?",
  },
  LOADING: "Cargando...",
  NO_DATA: "No hay datos disponibles",
  NO_RESULTS: "No se encontraron resultados",
} as const;

// ============================================================
// RUTAS Y URLS
// ============================================================

export const ROUTES = {
  HOME: "/",
  WORKER_DASHBOARD: "/worker",
  REPORTS: "/reports",
  REPORT_DETAIL: (id: string) => `/reports/${id}`,
  REPORT_CREATE: "/reports/create",
  REPORT_EDIT: (id: string) => `/reports/${id}/edit`,
  PROFILE: "/profile",
  SETTINGS: "/settings",
  DESIGN_SYSTEM: "/design-system",
  LOGIN: "/login",
  LOGOUT: "/logout",
  NOT_FOUND: "/404",
} as const;

// ============================================================
// REGEX Y VALIDACIÓN
// ============================================================

export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]{10,}$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/.+/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

// ============================================================
// VALORES POR DEFECTO
// ============================================================

export const DEFAULTS = {
  LANGUAGE: "es" as const,
  THEME: "system" as const,
  ITEMS_PER_PAGE: 20,
  TIMEZONE: "America/Bogota",
  DATE_FORMAT: "dd/MM/yyyy",
  TIME_FORMAT: "HH:mm",
  CURRENCY: "COP",
} as const;

// ============================================================
// CONFIGURACIÓN DE PAGINACIÓN
// ============================================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_SIZE: 20,
  MIN_SIZE: 5,
  MAX_SIZE: 100,
} as const;

// ============================================================
// DURACIÓN Y TIMEOUTS
// ============================================================

export const DURATIONS = {
  TOAST_DURATION_MS: 3000,
  DEBOUNCE_SEARCH_MS: 300,
  DEBOUNCE_RESIZE_MS: 150,
  AUTO_SAVE_INTERVAL_MS: 10000,
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutos
  CACHE_DURATION_MS: 5 * 60 * 1000, // 5 minutos
} as const;

// ============================================================
// CONFIGURACIÓN DE TABLA
// ============================================================

export const TABLE_CONFIG = {
  ROWS_PER_PAGE_OPTIONS: [10, 20, 50, 100],
  DEFAULT_ROWS_PER_PAGE: 20,
  ENABLE_SEARCH: true,
  ENABLE_SORT: true,
  ENABLE_FILTER: true,
  STICKY_HEADER: true,
} as const;
