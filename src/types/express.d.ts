import User from '../../db/users.queries.js';

declare global {
  namespace Express {
    interface Request {
      User?: User;
    }
  }
}
