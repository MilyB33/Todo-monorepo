import { Request, Response } from 'express';
import { User } from '../schema/user.schema';

// Config types

export interface IContext {
  req: Request;
  res: Response;
  user: User | null;
}
