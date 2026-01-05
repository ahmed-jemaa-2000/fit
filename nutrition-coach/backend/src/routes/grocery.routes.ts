import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { groceryController } from '../controllers/grocery.controller';

const router = Router();

router.use(authenticate);

// Stats endpoint (must be before /:id to avoid conflict)
router.get('/stats', (req, res) => groceryController.getStats(req, res));

// CRUD endpoints
router.post('/', (req, res) => groceryController.create(req, res));
router.get('/', (req, res) => groceryController.list(req, res));
router.delete('/all', (req, res) => groceryController.deleteAll(req, res));
router.get('/:id', (req, res) => groceryController.get(req, res));
router.patch('/:id', (req, res) => groceryController.update(req, res));
router.delete('/:id', (req, res) => groceryController.delete(req, res));

export default router;
