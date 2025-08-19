import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';
import { validate, taskSchema, taskUpdateSchema } from '../middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', validate(taskSchema), createTask);
router.put('/:id', validate(taskUpdateSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;