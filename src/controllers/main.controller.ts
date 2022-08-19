import { Request, Response } from 'express';
import { returnStaticHTML } from '../utils/helpers/html';

export function getMain(req: Request, res: Response) {
  return returnStaticHTML(res, 'index');
}

export function getProfile(req: Request, res: Response) {
  return returnStaticHTML(res, 'profile');
}
