import React, { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
  Calendar,
  Flag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { TaskStatus, type TaskResponseDTO } from "../../constants/types";
import { formatDate, isDueSoon, isOverdue } from "../../lib/utils";
import {
  useDeleteTask,
  useMarkTaskAsCompleted,
  useMarkTaskAsInProgress,
} from "../../api/task/useTaskMutations";
import toast from "react-hot-toast";

interface TaskCardProps {
  task: TaskResponseDTO;
  onEdit?: (task: TaskResponseDTO) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState<boolean>(false);

  const markCompleted = useMarkTaskAsCompleted();
  const markInProgress = useMarkTaskAsInProgress();
  const deleteTask = useDeleteTask();

  const getDueDateColor = (
    dueDate: string | null,
    status: TaskStatus
  ): string => {
    if (status === TaskStatus.COMPLETED) return "text-green-600";
    if (isOverdue(dueDate, status)) return "text-red-600";
    if (isDueSoon(dueDate, status)) return "text-yellow-600";
    return "text-gray-600";
  };

  const handleStatusChange = async (newStatus: TaskStatus): Promise<void> => {
    try {
      if (newStatus === TaskStatus.COMPLETED) {
        await markCompleted.mutateAsync(task.id);
        toast.success("Task marked as completed!");
      } else if (newStatus === TaskStatus.IN_PROGRESS) {
        await markInProgress.mutateAsync(task.id);
        toast.success("Task started!");
      }
    } catch {
      toast.error("Failed to update task status");
    }
  };

  const handleEdit = (): void => {
    if (onEdit) {
      onEdit(task);
    } else {
      navigate(`/tasks/${task.id}/edit`);
    }
    setShowActions(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask.mutateAsync(task.id);
        toast.success("Task deleted successfully!");
      } catch {
        toast.error("Failed to delete task");
      }
    }
    setShowActions(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowActions(false);
    if (showActions) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showActions]);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <div className="space-y-4">
        {/* Header - Title and Priority */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors">
                {task.title}
              </h3>
              <Badge variant={task.priority}>
                <Flag className="w-3 h-3 mr-1" />
                {task.priorityLabel}
              </Badge>
            </div>

            {task.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {task.description}
              </p>
            )}
          </div>

          {/* Mobile-friendly action menu */}
          <div className="relative ml-3">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-2"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <button
                  onClick={handleEdit}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center rounded-t-lg"
                >
                  <Edit className="w-4 h-4 mr-3 text-gray-400" />
                  Edit Task
                </button>

                <hr className="my-1" />
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center rounded-b-lg"
                  disabled={deleteTask.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-3 text-red-400" />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status and Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={task.status}>{task.statusLabel}</Badge>

            {task.dueDate && (
              <span
                className={`text-xs font-medium ${getDueDateColor(
                  task.dueDate,
                  task.status
                )}`}
              >
                <Calendar className="w-3 h-3 inline mr-1" />
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate, task.status) && (
                  <span className="ml-1 bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs">
                    Overdue
                  </span>
                )}
                {isDueSoon(task.dueDate, task.status) && (
                  <span className="ml-1 bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded text-xs">
                    Due Soon
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {task.status === TaskStatus.TODO && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
                disabled={markInProgress.isPending}
                className="text-xs"
              >
                <Clock className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Start</span>
              </Button>
            )}

            {task.status !== TaskStatus.COMPLETED && (
              <Button
                size="sm"
                variant="success"
                onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
                disabled={markCompleted.isPending}
                className="text-xs"
              >
                <Check className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Complete</span>
              </Button>
            )}
          </div>
        </div>

        {/* Footer - Timestamps */}
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span>Created {formatDate(task.createdAt)}</span>
            {task.updatedAt !== task.createdAt && (
              <span>Updated {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
