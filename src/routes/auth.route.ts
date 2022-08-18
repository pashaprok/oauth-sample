import { Router } from 'express';
import { authInit, oAuthCallback } from '../controllers/auth.controller';

const router: Router = Router();

router.route('/').get(authInit);
router.route('/oauth-callback').get(oAuthCallback);

export default router;
