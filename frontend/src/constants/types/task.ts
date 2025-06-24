import type { Priority, TaskStatus } from "./enums";

export interface TaskRepsonseDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  priority: Priority;
}
export interface TaskUpSertDTO {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string | null;
  priority: Priority;
}
