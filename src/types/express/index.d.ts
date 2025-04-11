import 'express';

declare module 'express' {
  interface Request {
    user?: string | jwt.JwtPayload;
  }
}
