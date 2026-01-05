import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { aiController } from '../controllers/ai.controller';

const router = Router();

router.use(authenticate);

router.post('/chat', (req, res) => aiController.chat(req, res));
router.get('/chat/history', (req, res) => aiController.getChatHistory(req, res));
router.post('/suggest-meals', (req, res) => aiController.suggestMeals(req, res));
router.get('/progress-analysis', (req, res) => aiController.getProgressAnalysis(req, res));
router.post('/generate-daily-plan', (req, res) => aiController.generateDailyPlan(req, res));

export default router;
