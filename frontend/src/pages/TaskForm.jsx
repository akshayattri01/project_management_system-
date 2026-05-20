import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const TaskForm = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    status: 'Pending',
    priority: 'Medium',
    deadline: ''
  });

  useEffect(() => {
    Promise.all([api.get('/projects'), api.get('/users')]).then(([projectRes, userRes]) => {
      setProjects(projectRes.data);
      setUsers(userRes.data.filter((user) => user.role === 'member'));
    });
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await api.post('/tasks', form);
      navigate('/tasks');
    } catch (err) {
      const validationMessage = err.response?.data?.errors?.[0]?.message;
      setError(validationMessage || err.response?.data?.message || 'Task creation failed');
    }
  };

  return (
    <section className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Task</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Assign a task to a project member with deadline and priority.</p>
      </div>
      <form className="space-y-5 rounded-md border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <label className="block"><span className="label">Title</span><input className="input mt-1" required minLength="2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="block"><span className="label">Description</span><textarea className="input mt-1 min-h-28" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block"><span className="label">Project</span><select className="input mt-1" required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}><option value="">Select project</option>{projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}</select></label>
          <label className="block"><span className="label">Assignee</span><select className="input mt-1" required value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}><option value="">Select member</option>{users.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}</select></label>
          <label className="block"><span className="label">Status</span><select className="input mt-1" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>In Progress</option><option>Completed</option><option>Overdue</option></select></label>
          <label className="block"><span className="label">Priority</span><select className="input mt-1" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label className="block md:col-span-2"><span className="label">Deadline</span><input className="input mt-1" type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></label>
        </div>
        <button className="btn-primary">Create Task</button>
      </form>
    </section>
  );
};

export default TaskForm;
