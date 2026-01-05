import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { mealsController } from '../controllers/meals.controller';

const router = Router();

router.use(authenticate);

router.post('/', (req, res) => mealsController.createMeal(req, res));
router.get('/', (req, res) => mealsController.getMeals(req, res));
router.get('/:id', (req, res) => mealsController.getMeal(req, res));
router.patch('/:id', (req, res) => mealsController.updateMeal(req, res));
router.delete('/:id', (req, res) => mealsController.deleteMeal(req, res));

export default router;
