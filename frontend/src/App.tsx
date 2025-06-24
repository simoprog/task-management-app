import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import TaskDetailPage from "./pages/task/TaskDetailPage";
import TasksPage from "./pages/task/TasksPage";
import CreateTaskPage from "./pages/task/CreateTaskPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/tasks" replace />} />

          {/* Main routes */}
          <Route path="/tasks/" element={<TasksPage />} />
          <Route path="/tasks/create" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
