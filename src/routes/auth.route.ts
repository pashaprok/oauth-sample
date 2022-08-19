import { Router } from 'express';
import {
  authInit,
  oAuthGithubCallback,
  oAuthGoogleCallback,
} from '../controllers/auth.controller';

const router: Router = Router();

router.route('/').get(authInit);
router.route('/github').get(oAuthGithubCallback);
router.route('/google').get(oAuthGoogleCallback);

export default router;
