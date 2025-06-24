import { useTasks } from "../../api/task/useTaskQueries";
import LoadingState from "../../components/ui/LoadingState";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import TaskCard from "../../components/task/TaskCard";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate("/tasks/create");
  };

  if (isLoading) {
    return <LoadingState />;
  }
  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className=" text-gray-600 mt-1">
            Manage and track your tasks
            {tasks && ` (${tasks.length} tasks)`}
          </p>
        </div>
        <Button onClick={handleCreateTask}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Task List */}
      {!tasks || tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started"
          actionLabel="Create Task"
          onAction={handleCreateTask}
        />
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => navigate(`/tasks/edit/${task.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
