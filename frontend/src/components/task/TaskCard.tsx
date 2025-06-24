import { Check, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  Priority,
  TaskStatus,
  type TaskResponseDTO,
} from "../../constants/types";
import { formatDate, isDueSoon, isOverdue } from "../../lib/utils";
import { useState } from "react";
import {
  useDeleteTask,
  useMarkTaskAsCompleted,
  useMarkTaskAsInProgress,
} from "../../api/task/useTaskMutations";
import Badge from "../ui/Badge";

interface TaskCardProps {
  task: TaskResponseDTO;
  onEdit: (task: TaskResponseDTO) => void;
}

const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const markCompleted = useMarkTaskAsCompleted();
  const markInProgress = useMarkTaskAsInProgress();
  const deleteTask = useDeleteTask();

  const getStatusBadgeVariant = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.TODO:
        return "todo";
      case TaskStatus.IN_PROGRESS:
        return "inProgress";
      case TaskStatus.COMPLETED:
        return "completed";
      default:
        return "default";
    }
  };

  const getPriorityBadgeVariant = (priority: Priority): string => {
    switch (priority) {
      case Priority.LOW:
        return "low";
      case Priority.MEDIUM:
        return "medium";
      case Priority.HIGH:
        return "high";
      default:
        return "default";
    }
  };

  const getDueDateColor = (
    dueDate: string | null,
    status: TaskStatus
  ): string => {
    if (status === TaskStatus.COMPLETED) return "text-green-600";
    if (isOverdue(dueDate, status)) return "text-red-600";
    if (isDueSoon(dueDate, status)) return "text-yellow-600";
    return "text-gray-600";
  };

  const handleStatusChange = (newStatus: TaskStatus): void => {
    if (newStatus === TaskStatus.COMPLETED) {
      markCompleted.mutateAsync(task.id);
    } else if (newStatus === TaskStatus.IN_PROGRESS) {
      markInProgress.mutateAsync(task.id);
    }
  };

  const handleDelete = (): void => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutateAsync(task.id);
      window.location.reload();
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Title and Description */}
          <div className="mb-3">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          {/* Badges and Info */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={getStatusBadgeVariant(task.status)}>
              {task.statusLabel}
            </Badge>
            <Badge variant={getPriorityBadgeVariant(task.priority)}>
              {task.priorityLabel}
            </Badge>
            {task.dueDate && (
              <span
                className={`text-xs ${getDueDateColor(
                  task.dueDate,
                  task.status
                )}`}
              >
                Due: {formatDate(task.dueDate)}
                {isOverdue(task.dueDate, task.status) && " (Overdue)"}
                {isDueSoon(task.dueDate, task.status) && " (Due Soon)"}
              </span>
            )}
          </div>

          {/* Timestamps */}
          <div className="text-xs text-gray-500">
            Created {formatDate(task.createdAt)}
            {task.updatedAt !== task.createdAt && (
              <span> • Updated {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Quick Status Actions */}
          {task.status !== TaskStatus.COMPLETED && (
            <Button
              size="sm"
              variant="success"
              onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
              disabled={markCompleted.isPending}
            >
              <Check className="w-4 h-4" />
            </Button>
          )}

          {task.status === TaskStatus.TODO && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
              disabled={markInProgress.isPending}
            >
              <Clock className="w-4 h-4" />
            </Button>
          )}

          {/* More Actions */}
          <div className="relative">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowActions(!showActions)}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                    setShowActions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  disabled={deleteTask.isPending}
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default TaskCard;
