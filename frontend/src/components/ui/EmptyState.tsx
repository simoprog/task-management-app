import { CheckSquare, Plus } from "lucide-react";
import Button from "./Button";
import type { ComponentType, SVGProps } from "react";
interface EmptyStateProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}
const EmptyState = ({
  icon: Icon = CheckSquare,
  title = "No tasks found",
  description = "Get started by creating your first task",
  actionLabel = "Create Task",
  onAction,
  className = "",
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            <Plus className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
