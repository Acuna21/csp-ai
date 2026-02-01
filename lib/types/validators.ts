/**
 * VALIDADORES Y UTILIDADES DE TIPOS
 * Funciones helper para validación y manipulación de tipos
 */

import { VALIDATION, LIMITS } from "./constants";
import {
  Report,
  ReportCriticality,
  ReportStatus,
  ReportCategory,
  UserRole,
  User,
  Worker,
  Student,
  Email,
  UUID,
  ValidationError,
  FormErrors,
  CreateReportFormData,
  UpdateWorkerSettingsFormData,
} from "./index";

// ============================================================
// VALIDADORES DE EMAIL Y CONTRASEÑA
// ============================================================

export function validateEmail(email: string): email is Email {
  if (!email || email.length > 254) return false;
  return VALIDATION.EMAIL.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  if (!phone) return false;
  return VALIDATION.PHONE.test(phone);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!password || password.length < LIMITS.MIN_PASSWORD_LENGTH) {
    errors.push(
      `La contraseña debe tener al menos ${LIMITS.MIN_PASSWORD_LENGTH} caracteres`
    );
  }

  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener letras minúsculas");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener letras mayúsculas");
  }

  if (!/\d/.test(password)) {
    errors.push("La contraseña debe contener números");
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push("La contraseña debe contener caracteres especiales (@$!%*?&)");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================
// VALIDADORES DE REPORTES
// ============================================================

export function validateReport(
  data: CreateReportFormData
): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  // Validar título
  if (!data.title?.trim()) {
    errors.push({
      field: "title",
      message: "El título es requerido",
      code: "REQUIRED",
    });
  } else if (data.title.length > LIMITS.MAX_TITLE_LENGTH) {
    errors.push({
      field: "title",
      message: `El título no puede exceder ${LIMITS.MAX_TITLE_LENGTH} caracteres`,
      code: "MAX_LENGTH",
    });
  }

  // Validar descripción
  if (!data.description?.trim()) {
    errors.push({
      field: "description",
      message: "La descripción es requerida",
      code: "REQUIRED",
    });
  } else if (data.description.length > LIMITS.MAX_DESCRIPTION_LENGTH) {
    errors.push({
      field: "description",
      message: `La descripción no puede exceder ${LIMITS.MAX_DESCRIPTION_LENGTH} caracteres`,
      code: "MAX_LENGTH",
    });
  }

  // Validar categoría
  if (!data.category || !Object.values(ReportCategory).includes(data.category)) {
    errors.push({
      field: "category",
      message: "La categoría es inválida",
      code: "INVALID",
    });
  }

  // Validar fecha de vencimiento si está presente
  if (data.dueDate && data.dueDate < Date.now()) {
    errors.push({
      field: "dueDate",
      message: "La fecha de vencimiento no puede ser en el pasado",
      code: "INVALID",
    });
  }

  // Validar adjuntos
  if (data.attachments && data.attachments.length > LIMITS.MAX_ATTACHMENTS_PER_REPORT) {
    errors.push({
      field: "attachments",
      message: `No se pueden adjuntar más de ${LIMITS.MAX_ATTACHMENTS_PER_REPORT} archivos`,
      code: "MAX_LENGTH",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateReportProgress(
  progress: number
): {
  isValid: boolean;
  message?: string;
} {
  if (typeof progress !== "number") {
    return { isValid: false, message: "El progreso debe ser un número" };
  }

  if (progress < 0 || progress > 100) {
    return {
      isValid: false,
      message: "El progreso debe estar entre 0 y 100",
    };
  }

  return { isValid: true };
}

// ============================================================
// VALIDADORES DE USUARIO
// ============================================================

export function validateUserRole(role: unknown): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole);
}

export function validateWorkerSettings(
  data: UpdateWorkerSettingsFormData
): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  if (
    data.displayLanguage &&
    !["es", "en"].includes(data.displayLanguage)
  ) {
    errors.push({
      field: "displayLanguage",
      message: "Idioma no válido",
      code: "INVALID",
    });
  }

  if (
    data.theme &&
    !["light", "dark", "system"].includes(data.theme)
  ) {
    errors.push({
      field: "theme",
      message: "Tema no válido",
      code: "INVALID",
    });
  }

  if (
    data.defaultView &&
    !["table", "cards", "grid"].includes(data.defaultView)
  ) {
    errors.push({
      field: "defaultView",
      message: "Vista no válida",
      code: "INVALID",
    });
  }

  if (
    data.itemsPerPage &&
    (data.itemsPerPage < 5 || data.itemsPerPage > 100)
  ) {
    errors.push({
      field: "itemsPerPage",
      message: "Elementos por página debe estar entre 5 y 100",
      code: "INVALID",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ============================================================
// TYPE GUARDS (Guardias de Tipo)
// ============================================================

export function isWorker(user: User): user is Worker {
  return (
    user.role === UserRole.WORKER ||
    user.role === UserRole.COORDINATOR
  );
}

export function isStudent(user: User): user is Student {
  return user.role === UserRole.STUDENT;
}

export function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN;
}

export function isValidReportStatus(status: unknown): status is ReportStatus {
  return Object.values(ReportStatus).includes(status as ReportStatus);
}

export function isValidReportCriticality(
  criticality: unknown
): criticality is ReportCriticality {
  return Object.values(ReportCriticality).includes(
    criticality as ReportCriticality
  );
}

export function isValidReportCategory(
  category: unknown
): category is ReportCategory {
  return Object.values(ReportCategory).includes(category as ReportCategory);
}

export function hasValidEmail(user: User): boolean {
  return validateEmail(user.email);
}

// ============================================================
// CONVERSORES Y TRANSFORMADORES
// ============================================================

export function formatErrorsToObject(
  errors: ValidationError[]
): FormErrors {
  return errors.reduce(
    (acc, error) => {
      if (acc[error.field]) {
        if (Array.isArray(acc[error.field])) {
          (acc[error.field] as string[]).push(error.message);
        } else {
          acc[error.field] = [acc[error.field] as string, error.message];
        }
      } else {
        acc[error.field] = error.message;
      }
      return acc;
    },
    {} as FormErrors
  );
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function getFullName(user: Pick<User, "firstName" | "lastName">): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

// ============================================================
// UTILIDADES DE ESTADO
// ============================================================

export function canTransitionStatus(
  from: ReportStatus,
  to: ReportStatus
): boolean {
  const validTransitions: Record<ReportStatus, ReportStatus[]> = {
    [ReportStatus.PENDING]: [
      ReportStatus.IN_PROGRESS,
      ReportStatus.REJECTED,
    ],
    [ReportStatus.IN_PROGRESS]: [
      ReportStatus.ON_HOLD,
      ReportStatus.COMPLETED,
      ReportStatus.REJECTED,
    ],
    [ReportStatus.ON_HOLD]: [
      ReportStatus.IN_PROGRESS,
      ReportStatus.REJECTED,
    ],
    [ReportStatus.COMPLETED]: [],
    [ReportStatus.REJECTED]: [ReportStatus.PENDING],
  };

  return validTransitions[from]?.includes(to) ?? false;
}

export function isReportOverdue(
  dueDate: number | undefined,
  currentDate: number = Date.now()
): boolean {
  if (!dueDate) return false;
  return currentDate > dueDate;
}

export function isReportCriticallyLate(
  dueDate: number | undefined,
  currentDate: number = Date.now()
): boolean {
  if (!dueDate) return false;
  const hoursUntilDue = (dueDate - currentDate) / (1000 * 60 * 60);
  return hoursUntilDue < 4; // Menos de 4 horas
}

export function calculateProgressPercentage(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getTimeAgoString(timestamp: number, currentTime: number = Date.now()): string {
  const diffMs = currentTime - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Hace poco";
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} h`;
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  return `Hace ${Math.floor(diffDays / 30)} meses`;
}

// ============================================================
// UTILIDADES DE FILTRADO
// ============================================================

export function filterReportsByStatus(
  reports: Report[],
  statuses: ReportStatus[]
): Report[] {
  if (statuses.length === 0) return reports;
  return reports.filter((report) => statuses.includes(report.status));
}

export function filterReportsByCriticality(
  reports: Report[],
  criticalities: ReportCriticality[]
): Report[] {
  if (criticalities.length === 0) return reports;
  return reports.filter((report) =>
    criticalities.includes(report.criticality)
  );
}

export function searchReports(
  reports: Report[],
  query: string,
  searchIn: Array<keyof Report> = ["title", "description"]
): Report[] {
  const lowerQuery = query.toLowerCase();
  return reports.filter((report) =>
    searchIn.some((field) => {
      const value = report[field];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(lowerQuery)
      );
    })
  );
}

// ============================================================
// UTILIDADES DE COMPARACIÓN
// ============================================================

export function areReportsEqual(
  report1: Report,
  report2: Report
): boolean {
  return JSON.stringify(report1) === JSON.stringify(report2);
}

export function hasReportChanged(
  original: Report,
  modified: Partial<Report>
): boolean {
  return Object.entries(modified).some(
    ([key, value]) =>
      original[key as keyof Report] !== value
  );
}
