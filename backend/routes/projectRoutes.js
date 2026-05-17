import express from 'express';
import { body, param } from 'express-validator';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

const createValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required').isLength({ min: 2 }).withMessage('Project name must be at least 2 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('teamMembers').optional().isArray().withMessage('Team members must be an array'),
  body('teamMembers.*').optional().isMongoId().withMessage('Invalid member id')
];

const updateValidation = [
  param('id').isMongoId().withMessage('Invalid project id'),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Project name must be at least 2 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('teamMembers').optional().isArray().withMessage('Team members must be an array'),
  body('teamMembers.*').optional().isMongoId().withMessage('Invalid member id')
];

router.route('/')
  .post(protect, authorize('admin'), createValidation, validateRequest, createProject)
  .get(protect, getProjects);

router.route('/:id')
  .put(protect, authorize('admin'), updateValidation, validateRequest, updateProject)
  .delete(protect, authorize('admin'), [param('id').isMongoId().withMessage('Invalid project id')], validateRequest, deleteProject);

export default router;
