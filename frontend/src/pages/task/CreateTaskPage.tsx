import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCreateTask } from "../../api/task/useTaskMutations";
import CreateTaskForm from "../../components/task/forms/TaskForm";
import Button from "../../components/ui/Button";
import type { TaskUpSertDTO } from "../../constants/types";
import toast from "react-hot-toast";

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const createTask = useCreateTask();

  const handleSubmit = async (data: TaskUpSertDTO): Promise<void> => {
    try {
      await createTask.mutateAsync(data);
      toast.success("Task created successfully!");
      navigate("/tasks");
    } catch {
      toast.error("Failed to create task:");
    }
  };

  const handleClose = (): void => {
    navigate("/tasks");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClose}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
        <p className="text-gray-600 mt-1">Add a new task to your list</p>
      </div>

      {/* Form */}
      <CreateTaskForm
        onSubmit={handleSubmit}
        onClose={handleClose}
        isLoading={createTask.isPending}
      />
    </div>
  );
};

export default CreateTaskPage;
