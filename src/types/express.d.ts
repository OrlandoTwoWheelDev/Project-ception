import User from '../../db/users.queries';

declare global {
  namespace Express {
    interface Request {
      User?: User;
    }
  }
}
