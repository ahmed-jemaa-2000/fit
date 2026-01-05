import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { profileController } from '../controllers/profile.controller';

const router = Router();

router.use(authenticate);

router.post('/', (req, res) => profileController.createProfile(req, res));
router.get('/', (req, res) => profileController.getProfile(req, res));
router.patch('/', (req, res) => profileController.updateProfile(req, res));

export default router;
