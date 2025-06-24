import { useQuery } from "@tanstack/react-query";
import { taskService } from "../services/task-service";
export const QueryKeys = {
  TASKS: "tasks",
  TASK: "task",
} as const;
export const useTasks = () => {
  return useQuery({
    queryKey: [QueryKeys.TASKS],
    queryFn: taskService.getAllTasks,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTaskById = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.TASK, id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
