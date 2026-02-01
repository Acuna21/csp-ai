/**
 * TIPOS PARA RESPUESTAS API
 * Definiciones de estructuras de respuestas del servidor
 */

import {
  UUID,
  Timestamp,
  Report,
  User,
  Worker,
  Student,
  Alert,
  Notification,
  Activity,
  Comment,
  ReportWithStudent,
  PaginatedResponse,
  ApiResponse,
  ReportStats,
  CreateReportFormData,
  UpdateReportFormData,
  SearchResult,
  WorkerDashboard,
} from "./index";

// ============================================================
// RESPUESTAS DE AUTENTICACIÓN
// ============================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number; // segundos
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "student" | "worker";
  studentId?: string;
  academicProgram?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  expiresIn: number;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ============================================================
// RESPUESTAS DE REPORTES
// ============================================================

export type GetReportsResponse = PaginatedResponse<ReportWithStudent>;

export interface GetReportDetailResponse extends ApiResponse<ReportWithStudent> {
  data: ReportWithStudent;
}

export interface CreateReportRequest extends CreateReportFormData {
  studentId?: UUID; // Requerido si el usuario es admin
}

export interface CreateReportResponse extends ApiResponse<Report> {
  data: Report;
}

export interface UpdateReportRequest extends UpdateReportFormData {}

export interface UpdateReportResponse extends ApiResponse<Report> {
  data: Report;
}

export interface DeleteReportResponse extends ApiResponse<void> {
  message: string;
}

export interface GetReportStatsResponse extends ApiResponse<ReportStats> {
  data: ReportStats;
}

export interface BulkUpdateReportsRequest {
  reportIds: UUID[];
  updates: Partial<UpdateReportFormData>;
}

export interface BulkUpdateReportsResponse extends ApiResponse<Report[]> {
  data: Report[];
  successful: number;
  failed: number;
}

// ============================================================
// RESPUESTAS DE USUARIOS
// ============================================================

export interface GetUsersResponse extends PaginatedResponse<User> {}

export interface GetUserDetailResponse extends ApiResponse<User> {
  data: User;
}

export interface GetWorkerDetailResponse extends ApiResponse<Worker> {
  data: Worker;
}

export interface GetStudentDetailResponse extends ApiResponse<Student> {
  data: Student;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface UpdateUserResponse extends ApiResponse<User> {
  data: User;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse extends ApiResponse<void> {
  message: string;
}

export interface GetUserMeResponse extends ApiResponse<User> {
  data: User;
}

// ============================================================
// RESPUESTAS DEL TABLERO (DASHBOARD)
// ============================================================

export interface GetWorkerDashboardResponse extends ApiResponse<WorkerDashboard> {
  data: WorkerDashboard;
}

export interface GetAlertsResponse extends ApiResponse<Alert[]> {
  data: Alert[];
}

export interface GetNotificationsResponse
  extends PaginatedResponse<Notification> {}

export interface GetActivitiesResponse
  extends PaginatedResponse<Activity> {}

export interface GetRecentActivityResponse extends ApiResponse<Activity[]> {
  data: Activity[];
}

// ============================================================
// RESPUESTAS DE BÚSQUEDA
// ============================================================

export interface SearchRequest {
  query: string;
  type?: "report" | "student" | "worker" | "all";
  limit?: number;
  offset?: number;
}

export interface SearchResponse extends ApiResponse<SearchResult> {
  data: SearchResult;
  queryTime: number; // en ms
}

// ============================================================
// RESPUESTAS DE COMENTARIOS
// ============================================================

export interface GetCommentsRequest {
  reportId: UUID;
  includeInternal?: boolean;
}

export interface GetCommentsResponse extends PaginatedResponse<Comment> {}

export interface CreateCommentRequest {
  reportId: UUID;
  content: string;
  isInternal: boolean;
  mentions?: UUID[];
}

export interface CreateCommentResponse extends ApiResponse<Comment> {
  data: Comment;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface UpdateCommentResponse extends ApiResponse<Comment> {
  data: Comment;
}

export interface DeleteCommentResponse extends ApiResponse<void> {
  message: string;
}

// ============================================================
// RESPUESTAS DE NOTIFICACIONES
// ============================================================

export interface GetNotificationPreferencesResponse extends ApiResponse<any> {
  data: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    criticalAlerts: boolean;
    dailySummary: boolean;
    weeklyReport: boolean;
    notificationTime?: string;
  };
}

export interface UpdateNotificationPreferencesRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  criticalAlerts?: boolean;
  dailySummary?: boolean;
  weeklyReport?: boolean;
  notificationTime?: string;
}

export interface UpdateNotificationPreferencesResponse extends ApiResponse<any> {
  data: any;
}

export interface MarkNotificationAsReadRequest {
  notificationId: UUID;
}

export interface MarkNotificationAsReadResponse extends ApiResponse<void> {
  message: string;
}

// ============================================================
// RESPUESTAS DE CONFIGURACIÓN
// ============================================================

export interface GetSettingsResponse extends ApiResponse<any> {
  data: any;
}

export interface UpdateSettingsRequest {
  displayLanguage?: "es" | "en";
  theme?: "light" | "dark" | "system";
  defaultView?: "table" | "cards" | "grid";
  itemsPerPage?: number;
  autoRefreshInterval?: number;
}

export interface UpdateSettingsResponse extends ApiResponse<any> {
  data: any;
}

// ============================================================
// RESPUESTAS DE ARCHIVOS
// ============================================================

export interface UploadFileRequest {
  file: File;
  reportId: UUID;
}

export interface UploadFileResponse extends ApiResponse<string> {
  data: string; // URL del archivo
  fileId: UUID;
  fileSize: number;
  mimeType: string;
}

export interface UploadMultipleFilesRequest {
  files: File[];
  reportId: UUID;
}

export interface UploadMultipleFilesResponse extends ApiResponse<string[]> {
  data: string[]; // URLs de los archivos
  uploadedCount: number;
  failedCount: number;
}

export interface DeleteFileResponse extends ApiResponse<void> {
  message: string;
}

// ============================================================
// RESPUESTAS DE ASIGNACIÓN
// ============================================================

export interface AssignReportRequest {
  reportId: UUID;
  workerId: UUID;
}

export interface AssignReportResponse extends ApiResponse<Report> {
  data: Report;
}

export interface UnassignReportRequest {
  reportId: UUID;
}

export interface UnassignReportResponse extends ApiResponse<Report> {
  data: Report;
}

export interface BulkAssignReportsRequest {
  reportIds: UUID[];
  workerId: UUID;
}

export interface BulkAssignReportsResponse extends ApiResponse<Report[]> {
  data: Report[];
  successful: number;
  failed: number;
}

// ============================================================
// RESPUESTAS DE ESTADÍSTICAS
// ============================================================

export interface GetDashboardStatsResponse extends ApiResponse<any> {
  data: {
    totalReports: number;
    pendingReports: number;
    completedReports: number;
    completionRate: number;
    averageResolutionTime: number;
    criticalReports: number;
    overallSatisfaction: number;
    lastUpdated: Timestamp;
  };
}

export interface GetWorkerStatsResponse extends ApiResponse<any> {
  data: {
    totalAssigned: number;
    completed: number;
    inProgress: number;
    overdue: number;
    averageCompletionTime: number;
    performanceScore: number;
    lastUpdated: Timestamp;
  };
}

// ============================================================
// RESPUESTAS DE REPORTES ESPECIALES
// ============================================================

export interface ExportReportsRequest {
  format: "csv" | "pdf" | "excel";
  filters?: any;
  includeColumns?: string[];
}

export interface ExportReportsResponse extends ApiResponse<string> {
  data: string; // URL para descargar
  fileName: string;
  fileSize: number;
}

export interface GenerateReportRequest {
  title: string;
  reportType: "daily" | "weekly" | "monthly";
  format?: "pdf" | "html";
  includeMetrics?: boolean;
}

export interface GenerateReportResponse extends ApiResponse<string> {
  data: string; // URL del reporte
  generatedAt: Timestamp;
}

// ============================================================
// RESPUESTAS DE ERROR ESTÁNDAR
// ============================================================

export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: Record<string, unknown>;
  timestamp: Timestamp;
}

export interface ValidationErrorResponse extends ErrorResponse {
  code: "VALIDATION_ERROR";
  details: {
    [fieldName: string]: string[];
  };
}

export interface NotFoundResponse extends ErrorResponse {
  code: "NOT_FOUND";
}

export interface UnauthorizedResponse extends ErrorResponse {
  code: "UNAUTHORIZED";
}

export interface ForbiddenResponse extends ErrorResponse {
  code: "FORBIDDEN";
}

export interface ConflictResponse extends ErrorResponse {
  code: "CONFLICT";
}

// ============================================================
// TIPOS DE UTILIDAD PARA API
// ============================================================

export type ApiErrorResponse = 
  | ErrorResponse
  | ValidationErrorResponse
  | NotFoundResponse
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse;

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retry?: number;
  skipAuth?: boolean;
}

export interface ApiRequestMetadata {
  timestamp: Timestamp;
  duration: number; // en ms
  endpoint: string;
  method: string;
  statusCode: number;
}

// ============================================================
// TIPOS GENÉRICOS PARA ENDPOINTS
// ============================================================

export interface ListEndpointParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, unknown>;
}

export interface BatchEndpointRequest<T> {
  operations: Array<{
    id: UUID;
    action: "create" | "update" | "delete";
    data: T;
  }>;
}

export interface BatchEndpointResponse<T> {
  successful: T[];
  failed: Array<{
    id: UUID;
    error: string;
  }>;
}
