import { Request, Response } from "express-serve-static-core";

export const getHomePage = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Home Page',
    data: {
      title: 'Home',
      description: 'This is the home page of the trivia application.',
    },
  });
}