import React from "react";
import { TaskStatus, Priority } from "../../constants/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "todo"
    | "inProgress"
    | "completed"
    | "low"
    | "medium"
    | "high"
    | TaskStatus
    | Priority;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const getVariantClass = (variant: string) => {
    switch (variant) {
      // Task Status variants
      case TaskStatus.TODO:
      case "todo":
        return "bg-gray-100 text-gray-800";
      case TaskStatus.IN_PROGRESS:
      case "inProgress":
        return "bg-blue-100 text-blue-800";
      case TaskStatus.COMPLETED:
      case "completed":
        return "bg-green-100 text-green-800";

      // Priority variants
      case Priority.LOW:
      case "low":
        return "bg-gray-100 text-gray-700";
      case Priority.MEDIUM:
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case Priority.HIGH:
      case "high":
        return "bg-red-100 text-red-800";

      // Default
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const variantClasses = getVariantClass(variant as string);
  const classes = `${baseClasses} ${variantClasses} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
