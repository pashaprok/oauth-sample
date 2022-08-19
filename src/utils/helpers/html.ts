import path from 'path';
import { Response } from 'express';

export function returnStaticHTML(res: Response, pageName: string) {
  return res.sendFile(
    path.join(process.cwd(), `/static/pages/${pageName}.html`),
  );
}
