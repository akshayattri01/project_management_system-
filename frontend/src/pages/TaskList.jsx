import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskTable from '../components/TaskTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

const TaskList = () => {
  const { isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => value && params.set(key, value));
    return params.toString();
  }, [filters]);

  const loadTasks = async () => {
    const { data } = await api.get(`/tasks${query ? `?${query}` : ''}`);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => { loadTasks(); }, [query]);

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    loadTasks();
  };

  const deleteTask = async (id) => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track assignment, deadlines, priority, and status.</p>
        </div>
        {isAdmin && <Link className="btn-primary" to="/tasks/new">Create Task</Link>}
      </div>

      <div className="mb-4 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
        <input className="input" placeholder="Search tasks" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select className="input" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option><option>Pending</option><option>In Progress</option><option>Completed</option><option>Overdue</option>
        </select>
        <select className="input" value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All priorities</option><option>Low</option><option>Medium</option><option>High</option>
        </select>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading tasks...</p> : <TaskTable tasks={tasks} onStatusChange={updateStatus} onDelete={deleteTask} isAdmin={isAdmin} />}
    </section>
  );
};

export default TaskList;
