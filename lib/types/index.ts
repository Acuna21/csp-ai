/**
 * SISTEMA DE TIPOS - UNIVERSIDAD LIBRE
 * App de Reportes Universitarios
 * 
 * Este archivo contiene todos los tipos e interfaces principales
 * del sistema, organizados por dominio de negocio.
 */

// ============================================================
// TIPOS DE UTILIDAD GENERAL
// ============================================================

export type UUID = string & { readonly __brand: "UUID" };
export type Email = string & { readonly __brand: "Email" };
export type PhoneNumber = string & { readonly __brand: "PhoneNumber" };
export type Timestamp = number;

export interface PageMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PageMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Timestamp;
}

// ============================================================
// ENUMS Y CONSTANTES
// ============================================================

export enum ReportCriticality {
  CRITICAL = "critical",
  MEDIUM = "medium",
  LOW = "low",
}

export enum ReportStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export enum ReportCategory {
  ENROLLMENT = "enrollment",
  CERTIFICATE = "certificate",
  GRADES = "grades",
  INFRASTRUCTURE = "infrastructure",
  FINANCIAL = "financial",
  OTHER = "other",
}

export enum UserRole {
  STUDENT = "student",
  WORKER = "worker",
  ADMIN = "admin",
  COORDINATOR = "coordinator",
}

export enum AlertType {
  CRITICAL_REPORTS = "critical_reports",
  EXPIRING_REPORTS = "expiring_reports",
  COMPLETED_REPORTS = "completed_reports",
  SYSTEM_NOTICE = "system_notice",
}

// ============================================================
// CONFIGURACIÓN DE DISEÑO Y TEMAS
// ============================================================

export interface CriticalityConfig {
  label: string;
  color: string;
  bgColor: string;
}

export interface CriticalityConfigMap {
  [key in ReportCriticality]: CriticalityConfig;
}

export const CRITICALITY_CONFIG: CriticalityConfigMap = {
  [ReportCriticality.CRITICAL]: {
    label: "Crítico",
    color: "#D31219",
    bgColor: "rgba(211, 18, 25, 0.1)",
  },
  [ReportCriticality.MEDIUM]: {
    label: "Medio",
    color: "#B28A12",
    bgColor: "rgba(178, 138, 18, 0.1)",
  },
  [ReportCriticality.LOW]: {
    label: "Bajo",
    color: "#2D8A3C",
    bgColor: "rgba(45, 138, 60, 0.1)",
  },
};

export interface ColorPalette {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  muted: string;
  mutedForeground: string;
  success: string;
  warning: string;
  error: string;
}

// ============================================================
// USUARIO Y AUTENTICACIÓN
// ============================================================

export interface User {
  id: UUID;
  email: Email;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  initials: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
}

export interface Worker extends User {
  role: UserRole.WORKER | UserRole.COORDINATOR;
  assignedCategories: ReportCategory[];
  maxCapacity: number;
  currentLoad: number;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  studentId: string;
  enrollmentStatus: "active" | "inactive" | "graduated";
  academicProgram: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Timestamp;
  refreshToken?: string;
}

// ============================================================
// REPORTES Y TICKETS
// ============================================================

export interface Report {
  id: UUID;
  title: string;
  description: string;
  studentId: UUID;
  workerId?: UUID;
  category: ReportCategory;
  criticality: ReportCriticality;
  status: ReportStatus;
  progress: number; // 0-100
  priority: number; // 1-10
  dueDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt?: Timestamp;
  notes?: string;
  attachments: string[]; // URLs
}

export interface ReportWithStudent extends Report {
  student: Student;
  worker?: Worker;
}

export interface ReportFilter {
  status?: ReportStatus[];
  criticality?: ReportCriticality[];
  category?: ReportCategory[];
  workerId?: UUID;
  studentId?: UUID;
  searchQuery?: string;
  dateRange?: {
    from: Timestamp;
    to: Timestamp;
  };
  sortBy?: "createdAt" | "dueDate" | "priority" | "criticality";
  sortOrder?: "asc" | "desc";
}

export interface ReportStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  critical: number;
  overdue: number;
  completionRate: number; // 0-100
  averageCompletionTime: number; // en horas
}

// ============================================================
// ALERTAS Y NOTIFICACIONES
// ============================================================

export interface Alert {
  id: UUID;
  type: AlertType;
  title: string;
  description: string;
  count: number;
  severity: "info" | "warning" | "critical";
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Timestamp;
  read: boolean;
}

export interface Notification {
  id: UUID;
  userId: UUID;
  title: string;
  message: string;
  type: "report_update" | "assignment" | "reminder" | "system";
  relatedReportId?: UUID;
  read: boolean;
  createdAt: Timestamp;
  actionUrl?: string;
}

export interface NotificationPreferences {
  userId: UUID;
  emailNotifications: boolean;
  pushNotifications: boolean;
  criticalAlerts: boolean;
  dailySummary: boolean;
  weeklyReport: boolean;
  notificationTime?: string; // HH:mm formato
}

// ============================================================
// BÚSQUEDA Y FILTRADO
// ============================================================

export interface SearchQuery {
  query: string;
  type?: "report" | "student" | "worker" | "all";
  filters?: ReportFilter;
}

export interface SearchResult {
  reports: Report[];
  students: Student[];
  workers: Worker[];
  query: string;
  totalResults: number;
}

// ============================================================
// TABLERO Y VISTAS (WORKER DASHBOARD)
// ============================================================

export interface WorkerDashboard {
  user: Worker;
  assignedReports: ReportWithStudent[];
  alerts: Alert[];
  stats: ReportStats;
  recentActivity: Activity[];
}

export interface Activity {
  id: UUID;
  type: "report_created" | "report_updated" | "report_completed" | "comment_added";
  reportId: UUID;
  reportTitle: string;
  description: string;
  actor?: User;
  timestamp: Timestamp;
  metadata?: Record<string, unknown>;
}

// ============================================================
// COMENTARIOS Y NOTAS
// ============================================================

export interface Comment {
  id: UUID;
  reportId: UUID;
  authorId: UUID;
  author?: User;
  content: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  isInternal: boolean; // Solo visible para workers/admin
  mentions?: UUID[]; // IDs de usuarios mencionados
}

export interface ReportNote {
  id: UUID;
  reportId: UUID;
  workerId: UUID;
  content: string;
  type: "private" | "shared"; // private solo para worker, shared visible al estudiante
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

// ============================================================
// CONFIGURACIÓN Y PREFERENCIAS
// ============================================================

export interface WorkerSettings {
  userId: UUID;
  notifications: NotificationPreferences;
  displayLanguage: "es" | "en";
  theme: "light" | "dark" | "system";
  defaultView: "table" | "cards" | "grid";
  itemsPerPage: number;
  autoRefreshInterval?: number; // en segundos
}

export interface SystemSettings {
  maintenanceMode: boolean;
  defaultReportDueTime: number; // en horas desde creación
  criticalThresholdHours: number;
  warningThresholdHours: number;
  maxReportsPerWorker: number;
  enableAutoAssignment: boolean;
}

// ============================================================
// FORMULARIOS Y ENTRADA DE DATOS
// ============================================================

export interface CreateReportFormData {
  title: string;
  description: string;
  category: ReportCategory;
  dueDate?: Timestamp;
  attachments?: File[];
}

export interface UpdateReportFormData {
  title?: string;
  description?: string;
  category?: ReportCategory;
  status?: ReportStatus;
  progress?: number;
  workerId?: UUID;
  dueDate?: Timestamp;
  notes?: string;
}

export interface UpdateWorkerSettingsFormData {
  displayLanguage?: "es" | "en";
  theme?: "light" | "dark" | "system";
  defaultView?: "table" | "cards" | "grid";
  itemsPerPage?: number;
}

// ============================================================
// COMPONENTES Y PROPS
// ============================================================

export interface ReportCardProps {
  report: ReportWithStudent;
  onSelect?: (reportId: UUID) => void;
  isSelected?: boolean;
  showStudent?: boolean;
}

export interface ReportTableRowProps {
  report: ReportWithStudent;
  onSelect?: (reportId: UUID) => void;
  isSelected?: boolean;
}

export interface AlertItemProps {
  alert: Alert;
  onClick?: () => void;
}

export interface WorkerAvatarProps {
  user: Worker | Student;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
}

export interface StatusBadgeProps {
  status: ReportStatus;
  size?: "sm" | "md" | "lg";
}

export interface CriticalityBadgeProps {
  criticality: ReportCriticality;
  size?: "sm" | "md" | "lg";
}

// ============================================================
// ERRORES Y VALIDACIÓN
// ============================================================

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
  statusCode: number;
  timestamp: Timestamp;
}

export interface FormErrors {
  [key: string]: string | string[];
}

// ============================================================
// UTILIDADES DE TIPO
// ============================================================

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonNullableFields<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};
