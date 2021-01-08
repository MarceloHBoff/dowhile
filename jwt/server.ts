import 'dotenv/config';
import express, { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

const api = express();

api.get('/generate', (req: Request, res: Response) => {
  const key = process.env.JWT_PRIVATE_KEY || '';

  const payload = req.query.data?.toString() || '';

  if (payload === '')
    return res.status(404).json({ message: 'Data is required' });

  const token = sign(payload, key, { algorithm: 'RS256' });

  return res.json({ token });
});

api.get('/verify', async (req: Request, res: Response) => {
  const key = process.env.JWT_PUBLIC_KEY || '';

  const payload = req.query.token?.toString() || '';

  if (payload === '')
    return res.status(404).json({ message: 'Token is required' });

  try {
    const decoded = verify(payload, key);

    return res.json({ payload: decoded });
  } catch {
    return res.status(404).json({ message: 'Invalid JWT token' });
  }
});

api.listen(3333);
