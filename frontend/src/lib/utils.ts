import { format, parseISO } from "date-fns";
import { TaskStatus } from "../constants/types";

export const formatDate = (date: Date | string) => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM dd, yyyy");
};

export const formatDateTime = (date: Date | string) => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMM dd, yyyy HH:mm");
};
export const isOverdue = (
  dueDate: string | null,
  status: TaskStatus
): boolean => {
  if (!dueDate || status === TaskStatus.COMPLETED) return false;

  try {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  } catch {
    return false;
  }
};
export const isDueSoon = (
  dueDate: string | null,
  status: TaskStatus,
  days: number = 3
): boolean => {
  if (!dueDate || status === TaskStatus.COMPLETED) return false;

  try {
    const due = new Date(dueDate);
    const today = new Date();
    const future = new Date();

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    future.setDate(today.getDate() + days);
    future.setHours(23, 59, 59, 999);

    return due >= today && due <= future;
  } catch {
    return false;
  }
};
