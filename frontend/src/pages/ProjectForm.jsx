import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const ProjectForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', teamMembers: [] });

  useEffect(() => {
    api.get('/users').then(({ data }) => setUsers(data.filter((user) => user.role === 'member')));
  }, []);

  const toggleMember = (id) => {
    setForm((current) => ({
      ...current,
      teamMembers: current.teamMembers.includes(id)
        ? current.teamMembers.filter((memberId) => memberId !== id)
        : [...current.teamMembers, id]
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await api.post('/projects', form);
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Project creation failed');
    }
  };

  return (
    <section className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Project</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Create a workspace and attach team members.</p>
      </div>
      <form className="space-y-5 rounded-md border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" onSubmit={submit}>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <label className="block"><span className="label">Project name</span><input className="input mt-1" required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="block"><span className="label">Description</span><textarea className="input mt-1 min-h-28" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <div>
          <p className="label mb-2">Team members</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {users.map((user) => (
              <label key={user._id} className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                <input type="checkbox" checked={form.teamMembers.includes(user._id)} onChange={() => toggleMember(user._id)} />
                <span>{user.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button className="btn-primary">Create Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;
