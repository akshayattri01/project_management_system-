import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

const populateProject = (query) => {
  return query.populate('createdBy', 'name email role').populate('teamMembers', 'name email role');
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description, teamMembers = [] } = req.body;
    const members = [...new Set(teamMembers.map(String))];
    const validMembers = await User.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      return res.status(422).json({ message: 'One or more team members are invalid' });
    }

    const project = await Project.create({ name, description, createdBy: req.user._id, teamMembers: members });
    const populated = await populateProject(Project.findById(project._id));
    return res.status(201).json(populated);
  } catch (error) {
    return next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { teamMembers: req.user._id };
    const projects = await populateProject(Project.find(filter).sort({ createdAt: -1 }));
    return res.json(projects);
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { name, description, teamMembers } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (teamMembers) {
      const members = [...new Set(teamMembers.map(String))];
      const validMembers = await User.find({ _id: { $in: members } });

      if (validMembers.length !== members.length) {
        return res.status(422).json({ message: 'One or more team members are invalid' });
      }

      project.teamMembers = members;
    }

    project.name = name ?? project.name;
    project.description = description ?? project.description;
    await project.save();

    const populated = await populateProject(Project.findById(project._id));
    return res.json(populated);
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    await Task.deleteMany({ projectId: project._id });
    await project.deleteOne();
    return res.json({ message: 'Project and related tasks deleted' });
  } catch (error) {
    return next(error);
  }
};
