import { BarChart3, Briefcase, CheckSquare, LogOut, Moon, PlusCircle, Sun, Users } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-teal-50 text-sea dark:bg-teal-950 dark:text-teal-200'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

const Layout = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sea text-white">
            <CheckSquare size={22} />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">TaskFlow</p>
            <p className="text-xs text-slate-500">Team workspace</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          <NavLink to="/dashboard" className={navLinkClass}><BarChart3 size={18} /> Dashboard</NavLink>
          <NavLink to="/projects" className={navLinkClass}><Briefcase size={18} /> Projects</NavLink>
          {isAdmin && <NavLink to="/projects/new" className={navLinkClass}><PlusCircle size={18} /> New Project</NavLink>}
          <NavLink to="/tasks" className={navLinkClass}><CheckSquare size={18} /> Tasks</NavLink>
          {isAdmin && <NavLink to="/tasks/new" className={navLinkClass}><Users size={18} /> Assign Task</NavLink>}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
              <h1 className="text-base font-semibold text-slate-900 dark:text-white">{user?.name} <span className="text-sm font-normal capitalize text-slate-500">({user?.role})</span></h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary px-3" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle dark mode">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="btn-secondary" onClick={handleLogout}><LogOut size={18} /> Logout</button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <nav className="mb-4 grid grid-cols-2 gap-2 lg:hidden">
            <NavLink to="/dashboard" className={navLinkClass}><BarChart3 size={18} /> Dashboard</NavLink>
            <NavLink to="/projects" className={navLinkClass}><Briefcase size={18} /> Projects</NavLink>
            {isAdmin && <NavLink to="/projects/new" className={navLinkClass}><PlusCircle size={18} /> New Project</NavLink>}
            <NavLink to="/tasks" className={navLinkClass}><CheckSquare size={18} /> Tasks</NavLink>
            {isAdmin && <NavLink to="/tasks/new" className={navLinkClass}><Users size={18} /> Assign Task</NavLink>}
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
