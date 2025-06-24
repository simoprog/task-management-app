import React, {
  useState,
  useEffect,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { Calendar, Flag, List, FileText } from "lucide-react";
import {
  type TaskResponseDTO,
  type TaskUpSertDTO,
  Priority,
  STATUS_LABELS,
  PRIORITY_LABELS,
  DEFAULT_VALUES,
  TaskStatus,
} from "../../../constants/types";
import Button from "../../ui/Button";

interface TaskFormProps {
  task?: TaskResponseDTO | null;
  mode?: "create" | "edit";
  onClose: () => void;
  onSubmit: (data: TaskUpSertDTO) => void;
  isLoading?: boolean;
}

interface FormData {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

interface FormErrors {
  title?: string;
  description?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  mode = "create",
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    priority: DEFAULT_VALUES.PRIORITY,
    status: DEFAULT_VALUES.STATUS,
    dueDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize form data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || DEFAULT_VALUES.PRIORITY,
        status: task.status || DEFAULT_VALUES.STATUS,
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "priority") {
      setFormData((prev) => ({ ...prev, [name]: value as Priority }));
    } else if (name === "status") {
      setFormData((prev) => ({ ...prev, [name]: value as TaskStatus }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 255) {
      newErrors.title = "Title must be less than 255 characters";
    }

    if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate || undefined,
    };

    onSubmit(submitData);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return "text-red-600 bg-red-50 border-red-200";
      case Priority.MEDIUM:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case Priority.LOW:
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "text-gray-600 bg-gray-50 border-gray-200";
      case TaskStatus.IN_PROGRESS:
        return "text-blue-600 bg-blue-50 border-blue-200";
      case TaskStatus.COMPLETED:
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 mr-2 text-gray-500" />
            Task Title
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`
              block w-full px-4 py-3 border rounded-lg text-lg
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 transition-colors
              ${
                errors.title
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            placeholder="What needs to be done?"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-sm text-red-600 flex items-center">
              <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
              {errors.title}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <List className="w-4 h-4 mr-2 text-gray-500" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`
              block w-full px-4 py-3 border rounded-lg
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-blue-500 transition-colors resize-vertical
              ${
                errors.description
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            placeholder="Add more details about this task..."
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-sm text-red-600 flex items-center">
              <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
              {errors.description}
            </p>
          )}
        </div>

        {/* Priority and Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Flag className="w-4 h-4 mr-2 text-gray-500" />
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`
                block w-full px-4 py-3 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${getPriorityColor(formData.priority)}
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={isLoading}
            >
              {Object.entries(Priority).map(([key, value]) => (
                <option key={key} value={value}>
                  {PRIORITY_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <List className="w-4 h-4 mr-2 text-gray-500" />
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`
                block w-full px-4 py-3 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${getStatusColor(formData.status)}
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={isLoading}
            >
              {Object.entries(TaskStatus).map(([key, value]) => (
                <option key={key} value={value}>
                  {STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            Due Date
          </label>
          <input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            className={`
              block w-full px-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={isLoading}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {mode === "create" ? "Create Task" : "Update Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
