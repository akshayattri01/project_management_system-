import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const AuthShell = ({ title, subtitle, children }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
    <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-sea text-white"><CheckSquare /></div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage team work">
      <form className="space-y-4" onSubmit={submit}>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <label className="block"><span className="label">Email</span><input className="input mt-1" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="block"><span className="label">Password</span><input className="input mt-1" type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">No account? <Link className="font-semibold text-sea" to="/signup">Create one</Link></p>
    </AuthShell>
  );
};

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create workspace access" subtitle="Start as admin or member">
      <form className="space-y-4" onSubmit={submit}>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <label className="block"><span className="label">Name</span><input className="input mt-1" required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="block"><span className="label">Email</span><input className="input mt-1" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="block"><span className="label">Password</span><input className="input mt-1" type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <label className="block"><span className="label">Role</span><select className="input mt-1" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="member">Member</option><option value="admin">Admin</option></select></label>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Signup'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link className="font-semibold text-sea" to="/login">Login</Link></p>
    </AuthShell>
  );
};
