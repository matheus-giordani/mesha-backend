import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    
    if (id && !/^\d+$/.test(id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid ID parameter' });
    }

    next();
  }
}
