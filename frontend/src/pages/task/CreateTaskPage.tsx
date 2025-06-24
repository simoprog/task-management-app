import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { useCreateTask } from "../../api/task/useTaskMutations";
import Button from "../../components/ui/Button";
import type { TaskUpSertDTO } from "../../constants/types";
import toast from "react-hot-toast";
import TaskForm from "../../components/task/forms/TaskForm";

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const createTask = useCreateTask();

  const handleSubmit = (data: TaskUpSertDTO): void => {
    createTask
      .mutateAsync(data)
      .then(() => {
        toast.success("Task created successfully!");
        navigate("/tasks");
      })
      .catch(() => {
        toast.error("Failed to create task");
      });
  };

  const handleClose = (): void => {
    navigate("/tasks");
  };

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
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Task
            </h1>
            <p className="text-lg text-gray-600">
              Add a new task to organize your work
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <TaskForm
              mode="create"
              onSubmit={handleSubmit}
              onClose={handleClose}
              isLoading={createTask.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
