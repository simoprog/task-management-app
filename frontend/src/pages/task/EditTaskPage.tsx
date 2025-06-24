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
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading Task
            </h3>
            <p className="text-gray-600">
              Please wait while we fetch your task...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
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
    );
  }

  // Task not found state
  if (!task) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
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
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Edit3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Edit Task
            </h1>
            <p className="text-lg text-gray-600">Update "{task.title}"</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
  );
};

export default EditTaskPage;
