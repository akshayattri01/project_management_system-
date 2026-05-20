import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

const populateTask = (query) => {
  return query.populate('projectId', 'name description').populate('assignedTo', 'name email role');
};

const taskFilterForUser = (user) => (user.role === 'admin' ? {} : { assignedTo: user._id });

export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, assignedTo, status, deadline, priority } = req.body;
    const [project, assignee] = await Promise.all([Project.findById(projectId), User.findById(assignedTo)]);

    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!assignee) return res.status(404).json({ message: 'Assigned user not found' });

    const isProjectMember = project.teamMembers.some((memberId) => memberId.equals(assignedTo));
    if (!isProjectMember) {
      project.teamMembers.push(assignedTo);
      await project.save();
    }

    const task = await Task.create({ title, description, projectId, assignedTo, status, deadline, priority });
    const populated = await populateTask(Task.findById(task._id));
    return res.status(201).json(populated);
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status, search, projectId, priority } = req.query;
    const filter = taskFilterForUser(req.user);

    if (status) filter.status = status;
    if (projectId) filter.projectId = projectId;
    if (priority) filter.priority = priority;
    if (search) filter.$text = { $search: search };

    const tasks = await populateTask(Task.find(filter).sort({ deadline: 1, createdAt: -1 }));
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role === 'member') {
      if (!task.assignedTo.equals(req.user._id)) {
        return res.status(403).json({ message: 'You can update only your assigned tasks' });
      }
      task.status = req.body.status ?? task.status;
    } else {
      ['title', 'description', 'projectId', 'assignedTo', 'status', 'deadline', 'priority'].forEach((field) => {
        if (req.body[field] !== undefined) task[field] = req.body[field];
      });
    }

    await task.save();
    const populated = await populateTask(Task.findById(task._id));
    return res.json(populated);
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    return res.json({ message: 'Task deleted' });
  } catch (error) {
    return next(error);
  }
};
