import type {
  Priority,
  TaskStatus,
  TaskUpSertDTO,
} from "../../constants/types";
import { api } from "./api";

export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData: TaskUpSertDTO) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id: string, taskData: TaskUpSertDTO) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
    return { success: true };
  },

  // Mark task as completed
  markTaskAsCompleted: async (id: string) => {
    const response = await api.put(`/tasks/${id}/complete`);
    return response.data;
  },

  // Mark task as in progress
  markTaskAsInProgress: async (id: string) => {
    const response = await api.put(`/tasks/${id}/start`);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (id: string, status: TaskStatus) => {
    const response = await api.put(`/tasks/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  // Update task priority
  updateTaskPriority: async (id: string, priority: Priority) => {
    const response = await api.put(`/tasks/${id}/priority`, null, {
      params: { priority },
    });
    return response.data;
  },
};
