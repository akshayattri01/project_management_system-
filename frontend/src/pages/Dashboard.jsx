import { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard.jsx';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/users/dashboard').then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <p className="text-sm text-slate-500">Loading dashboard...</p>;

  const cards = isAdmin
    ? [
        ['Total Projects', stats.totalProjects, 'teal'],
        ['Total Tasks', stats.totalTasks, 'slate'],
        ['Completed Tasks', stats.completedTasks, 'teal'],
        ['Pending Tasks', stats.pendingTasks, 'amber'],
        ['Overdue Tasks', stats.overdueTasks, 'coral']
      ]
    : [
        ['My Tasks', stats.myTasks, 'slate'],
        ['Completed Tasks', stats.completedTasks, 'teal'],
        ['Pending Tasks', stats.pendingTasks, 'amber']
      ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Live project and task progress.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value, tone]) => <DashboardCard key={label} label={label} value={value} tone={tone} />)}
      </div>
    </section>
  );
};

export default Dashboard;
