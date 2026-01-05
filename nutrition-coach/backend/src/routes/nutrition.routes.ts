import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { nutritionController } from '../controllers/nutrition.controller';

const router = Router();

router.use(authenticate);

router.get('/daily', (req, res) => nutritionController.getDailyNutrition(req, res));
router.get('/weekly', (req, res) => nutritionController.getWeeklyNutrition(req, res));
router.get('/stats', (req, res) => nutritionController.getStats(req, res));

export default router;
