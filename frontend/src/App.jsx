import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { Login, Signup } from './pages/AuthPages.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectForm from './pages/ProjectForm.jsx';
import ProjectList from './pages/ProjectList.jsx';
import TaskForm from './pages/TaskForm.jsx';
import TaskList from './pages/TaskList.jsx';

const PublicOnly = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
      <Route path="/signup" element={<PublicOnly><Signup /></PublicOnly>} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<Layout />}>
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/tasks/new" element={<TaskForm />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
