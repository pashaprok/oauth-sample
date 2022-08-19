import { Request, Response } from 'express';
import {
  getRedirectString,
  resolveOAuthCallback,
} from '../services/auth.service';
import { ServicesEnum } from '../enums/services.enum';

export function authInit(req: Request, res: Response) {
  const { service } = req.query;
  const redirectUrl = getRedirectString(<ServicesEnum>service);
  return res.redirect(redirectUrl);
}

export async function oAuthGithubCallback(req: Request, res: Response) {
  return resolveOAuthCallback(ServicesEnum.github, req, res);
}

export async function oAuthGoogleCallback(req: Request, res: Response) {
  return resolveOAuthCallback(ServicesEnum.google, req, res);
}
