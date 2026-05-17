import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const getDashboard = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const [totalProjects, totalTasks, completedTasks, pendingTasks, overdueTasks] = await Promise.all([
        Project.countDocuments(),
        Task.countDocuments(),
        Task.countDocuments({ status: 'Completed' }),
        Task.countDocuments({ status: 'Pending' }),
        Task.countDocuments({
          $or: [
            { status: 'Overdue' },
            { deadline: { $lt: new Date() }, status: { $ne: 'Completed' } }
          ]
        })
      ]);

      return res.json({ totalProjects, totalTasks, completedTasks, pendingTasks, overdueTasks });
    }

    const assignedTo = req.user._id;
    const [myTasks, completedTasks, pendingTasks] = await Promise.all([
      Task.countDocuments({ assignedTo }),
      Task.countDocuments({ assignedTo, status: 'Completed' }),
      Task.countDocuments({ assignedTo, status: 'Pending' })
    ]);

    return res.json({ myTasks, completedTasks, pendingTasks });
  } catch (error) {
    return next(error);
  }
};
