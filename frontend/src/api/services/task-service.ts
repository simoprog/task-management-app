import type {
  Priority,
  TaskResponseDTO,
  TaskStatus,
  TaskUpSertDTO,
} from "../../constants/types";
import { api } from "./api";

export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<TaskResponseDTO[]> => {
    const response = await api.get("/tasks");
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<TaskResponseDTO> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData: TaskUpSertDTO): Promise<TaskResponseDTO> => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // Update task
  updateTask: async (
    id: number,
    taskData: TaskUpSertDTO
  ): Promise<TaskResponseDTO> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
    return { success: true };
  },

  // Mark task as completed
  markTaskAsCompleted: async (id: number) => {
    const response = await api.put(`/tasks/${id}/completed`);
    return response.data;
  },

  // Mark task as in progress
  markTaskAsInProgress: async (id: number) => {
    const response = await api.put(`/tasks/${id}/start`);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (id: number, status: TaskStatus) => {
    const response = await api.put(`/tasks/${id}/status`, null, {
      params: { status },
    });
    return response.data;
  },

  // Update task priority
  updateTaskPriority: async (id: number, priority: Priority) => {
    const response = await api.put(`/tasks/${id}/priority`, null, {
      params: { priority },
    });
    return response.data;
  },
};
