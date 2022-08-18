import { Router } from 'express';
import { getMain } from '../controllers/main.controller';

const router: Router = Router();

router.route('/').get(getMain);

export default router;
