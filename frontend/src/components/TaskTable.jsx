const statusClass = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  'In Progress': 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200',
  Completed: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200',
  Overdue: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
};

const priorityClass = {
  Low: 'text-slate-500',
  Medium: 'text-amber-600',
  High: 'text-red-600'
};

const TaskTable = ({ tasks, onStatusChange, isAdmin, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              {['Task', 'Project', 'Assignee', 'Priority', 'Deadline', 'Status', 'Actions'].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{task.title}</p>
                  <p className="max-w-sm truncate text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{task.projectId?.name || 'Unassigned'}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{task.assignedTo?.name || 'Unknown'}</td>
                <td className={`px-4 py-3 text-sm font-semibold ${priorityClass[task.priority]}`}>{task.priority}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{new Date(task.deadline).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusClass[task.status]}`}>{task.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex min-w-44 items-center gap-2">
                    <select className="input py-1" value={task.status} onChange={(event) => onStatusChange(task._id, event.target.value)}>
                      {Object.keys(statusClass).map((status) => <option key={status}>{status}</option>)}
                    </select>
                    {isAdmin && <button className="btn-secondary px-3 py-1 text-red-600" onClick={() => onDelete(task._id)}>Delete</button>}
                  </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan="7">No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
