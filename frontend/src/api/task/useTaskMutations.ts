import { QueryClient, useMutation } from "@tanstack/react-query";
import { taskService } from "../services/task-service";
import { QueryKeys } from "./useTaskQueries";
import type { TaskUpSertDTO } from "../../constants/types";

export const useCreateTask = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
};
export const useUpdateTask = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ id, taskData }: { id: string; taskData: TaskUpSertDTO }) =>
      taskService.updateTask(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
    onError: (error) => {
      console.error("Error updating task:", error);
    },
  });
};
export const useDeleteTask = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};
export const useMarkTaskAsCompleted = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.markTaskAsCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
    onError: (error) => {
      console.error("Error marking task as completed:", error);
    },
  });
};
export const useMarkTaskAsInProgress = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.markTaskAsInProgress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
    onError: (error) => {
      console.error("Error marking task as in progress:", error);
    },
  });
};
