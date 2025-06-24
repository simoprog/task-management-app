import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/task-service";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getAllTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTaskById = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
