import { Router } from 'express';
import { getMain, getProfile } from '../controllers/main.controller';

const router: Router = Router();

router.route('/').get(getMain);
router.route('/profile').get(getProfile);

export default router;
