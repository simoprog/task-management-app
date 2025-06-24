import { Priority, TaskStatus } from "./enums";

export interface TaskResponseDTO {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  priority: Priority;
  statusLabel: string;
  priorityLabel: string;
}
export interface TaskUpSertDTO {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string | null;
  priority: Priority;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.COMPLETED]: "Completed",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.LOW]: "Low",
  [Priority.MEDIUM]: "Medium",
  [Priority.HIGH]: "High",
};

export const STATUS_BADGE_VARIANTS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "todo",
  [TaskStatus.IN_PROGRESS]: "inProgress",
  [TaskStatus.COMPLETED]: "completed",
};

export const PRIORITY_BADGE_VARIANTS: Record<Priority, string> = {
  [Priority.LOW]: "low",
  [Priority.MEDIUM]: "medium",
  [Priority.HIGH]: "high",
};

export const DEFAULT_VALUES = {
  STATUS: TaskStatus.TODO,
  PRIORITY: Priority.MEDIUM,
};
