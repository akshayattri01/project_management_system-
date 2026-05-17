import express from 'express';
import { param } from 'express-validator';
import { getDashboard } from '../controllers/dashboardController.js';
import { getUserById, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/dashboard', protect, getDashboard);
router.get('/:id', protect, [param('id').isMongoId().withMessage('Invalid user id')], validateRequest, getUserById);

export default router;
