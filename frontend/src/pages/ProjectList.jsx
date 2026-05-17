import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';

const ProjectList = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    const { data } = await api.get('/projects');
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const deleteProject = async (id) => {
    if (!confirm('Delete this project and its tasks?')) return;
    await api.delete(`/projects/${id}`);
    loadProjects();
  };

  if (loading) return <p className="text-sm text-slate-500">Loading projects...</p>;

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Plan initiatives and manage project membership.</p>
        </div>
        {isAdmin && <Link className="btn-primary" to="/projects/new">Create Project</Link>}
      </div>

      {projects.length === 0 ? <EmptyState title="No projects yet" body="Admins can create a project and add members." /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project._id} className="rounded-md border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
                </div>
                {isAdmin && <button className="btn-secondary px-3 py-1 text-red-600" onClick={() => deleteProject(project._id)}>Delete</button>}
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
                <p className="font-medium text-slate-700 dark:text-slate-200">Members</p>
                <p className="mt-1 text-slate-500 dark:text-slate-400">{project.teamMembers?.map((member) => member.name).join(', ') || 'No members assigned'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectList;
