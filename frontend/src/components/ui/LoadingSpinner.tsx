import { Loader2 } from "lucide-react";
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
const LoadingSpinner = ({
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Loader2
        className={`animate-spin ${sizes[size]} text-blue-600 ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner;
