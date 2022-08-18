import { Response } from 'express';
import createError, { HttpError } from 'http-errors';

export function catchErrors(err: any, res: Response) {
  if (err instanceof HttpError) {
    return createError(err.statusCode || 500, err.message);
  }

  return res.status(500).json({
    message: err.toString(),
    stack: err.stack,
  });
}
