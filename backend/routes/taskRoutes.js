import express from 'express';
import { body, param, query } from 'express-validator';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();
const statuses = ['Pending', 'In Progress', 'Completed', 'Overdue'];
const priorities = ['Low', 'Medium', 'High'];

const futureDeadline = (value) => {
  if (Number.isNaN(Date.parse(value))) throw new Error('Deadline must be a valid date');
  if (new Date(value) < new Date()) throw new Error('Deadline must be in the future');
  return true;
};

const createValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('projectId').isMongoId().withMessage('Valid project id is required'),
  body('assignedTo').isMongoId().withMessage('Valid assigned user id is required'),
  body('status').optional().isIn(statuses).withMessage('Invalid task status'),
  body('priority').optional().isIn(priorities).withMessage('Invalid task priority'),
  body('deadline').custom(futureDeadline)
];

const updateValidation = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title').optional().trim().isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('projectId').optional().isMongoId().withMessage('Invalid project id'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid assigned user id'),
  body('status').optional().isIn(statuses).withMessage('Invalid task status'),
  body('priority').optional().isIn(priorities).withMessage('Invalid task priority'),
  body('deadline').optional().custom(futureDeadline)
];

router.route('/')
  .post(protect, authorize('admin'), createValidation, validateRequest, createTask)
  .get(
    protect,
    [
      query('status').optional().isIn(statuses).withMessage('Invalid task status'),
      query('priority').optional().isIn(priorities).withMessage('Invalid task priority'),
      query('projectId').optional().isMongoId().withMessage('Invalid project id')
    ],
    validateRequest,
    getTasks
  );

router.route('/:id')
  .put(protect, updateValidation, validateRequest, updateTask)
  .delete(protect, authorize('admin'), [param('id').isMongoId().withMessage('Invalid task id')], validateRequest, deleteTask);

export default router;
