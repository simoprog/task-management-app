import { useEffect } from "react";
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

  useEffect(() => {
    console.log("Tasks loaded:", tasks);
  }, [tasks]);
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
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
        <div className="grid gap-4">
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
