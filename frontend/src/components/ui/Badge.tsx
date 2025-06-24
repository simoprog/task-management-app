import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "todo"
    | "inProgress"
    | "completed"
    | "low"
    | "medium"
    | "high";
  className?: string;
}
const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    default: "bg-gray-100 text-gray-800",
    todo: "bg-gray-100 text-gray-800",
    inProgress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
