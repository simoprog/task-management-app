import { useMutation } from "@tanstack/react-query";
import { taskService } from "../services/task-service";
import type { TaskUpSertDTO } from "../../constants/types";
import { queryClient } from "../query-client";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};
export const useUpdateTask = () => {
  return useMutation({
    mutationFn: ({ id, taskData }: { id: number; taskData: TaskUpSertDTO }) =>
      taskService.updateTask(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};
export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};
export const useMarkTaskAsCompleted = () => {
  return useMutation({
    mutationFn: (id: number) => taskService.markTaskAsCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error marking task as completed:", error);
    },
  });
};
export const useMarkTaskAsInProgress = () => {
  return useMutation({
    mutationFn: (id: number) => taskService.markTaskAsInProgress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error marking task as in progress:", error);
    },
  });
};
