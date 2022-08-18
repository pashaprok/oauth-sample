import path from 'path';
import { Request, Response } from 'express';

export function getMain(req: Request, res: Response) {
  return res.sendFile(path.join(__dirname, '../../static/index.html'));
}
