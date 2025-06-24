import React, {
  useState,
  useEffect,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { X } from "lucide-react";
import {
  Priority,
  type TaskResponseDTO,
  type TaskUpSertDTO,
  STATUS_LABELS,
  PRIORITY_LABELS,
  DEFAULT_VALUES,
  TaskStatus,
} from "../../../constants/types";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Card from "../../ui/Card";

interface TaskFormProps {
  task?: TaskResponseDTO | null;
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
  priority?: string;
  status?: string;
  dueDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
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

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || DEFAULT_VALUES.PRIORITY,
        status: task.status || DEFAULT_VALUES.STATUS,
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: DEFAULT_VALUES.PRIORITY,
        status: DEFAULT_VALUES.STATUS,
        dueDate: "",
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

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 255) {
      newErrors.title = "Title must be less than 255 characters";
    }

    // Description validation
    if (formData.description.length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }

    // Due date validation (optional but if provided, should be valid)
    if (formData.dueDate) {
      const date = new Date(formData.dueDate);
      if (isNaN(date.getTime())) {
        newErrors.dueDate = "Please enter a valid date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate || undefined,
    };

    onSubmit(submitData);
  };

  const handleClose = (): void => {
    setFormData({
      title: "",
      description: "",
      priority: DEFAULT_VALUES.PRIORITY,
      status: DEFAULT_VALUES.STATUS,
      dueDate: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="p-1"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form Fields */}
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          error={errors.title}
          required
          placeholder="Enter task title..."
          disabled={isLoading}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className={`
                block w-full px-3 py-2 border border-gray-300 rounded-lg 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 transition-colors resize-vertical
                ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            placeholder="Enter task description..."
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={`
                  block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
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

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={`
                  block w-full px-3 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
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

        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleInputChange}
          error={errors.dueDate}
          disabled={isLoading}
        />

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
