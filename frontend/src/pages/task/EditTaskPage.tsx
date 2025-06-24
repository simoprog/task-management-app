import React from "react";
import { ArrowLeft, Edit3, Loader2, AlertCircle } from "lucide-react";
import { useUpdateTask } from "../../api/task/useTaskMutations";
import Button from "../../components/ui/Button";
import type { TaskUpSertDTO } from "../../constants/types";
import { useTaskById } from "../../api/task/useTaskQueries";
import toast from "react-hot-toast";
import TaskForm from "../../components/task/forms/TaskForm";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const taskId = id ? parseInt(id, 10) : null;
  const { data: task, isLoading: isLoadingTask, error } = useTaskById(taskId!);
  const updateTask = useUpdateTask();

  const handleSubmit = async (data: TaskUpSertDTO): Promise<void> => {
    if (!taskId) return;
    try {
      await updateTask.mutateAsync({
        id: taskId,
        taskData: data,
      });
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleClose = (): void => {
    navigate("/tasks");
  };

  // Loading state
  if (isLoadingTask) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Loading Task
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch your task...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-lg p-8 shadow-sm text-center max-w-md">
              <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Error Loading Task
              </h2>
              <p className="text-gray-600 mb-6">{error.message}</p>
              <Button onClick={handleClose} variant="outline">
                Back to Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Task not found state
  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-lg p-8 shadow-sm text-center max-w-md">
              <div className="bg-gray-100 p-3 rounded-full w-fit mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Task Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The task you're looking for doesn't exist.
              </p>
              <Button onClick={handleClose} variant="outline">
                Back to Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Task</h1>
            <p className="text-lg text-gray-600">Update "{task.title}"</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <TaskForm
              mode="edit"
              task={task}
              onSubmit={handleSubmit}
              onClose={handleClose}
              isLoading={updateTask.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
