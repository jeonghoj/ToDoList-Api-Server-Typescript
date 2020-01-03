import UsersService from '../../component/users/usersService';
import { NextFunction, Request, Response } from 'express';
import UserErrorHandler from '../../component/users/userErrorHandler';
import logger from '../../config/logger';
import passport from 'passport';
import * as jwt from 'jsonwebtoken';

export class Controller {
  async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const createdUser = await UsersService.register(username, password);
      if (createdUser !== null) {
        res.status(201).json({
          data: { id: createdUser.id },
          msg: 'Register Success',
        });
      } else {
        new UserErrorHandler(409, 'User already exit');
        return;
      }
    } catch (e) {
      logger.error(e);
      throw new UserErrorHandler(500, 'Server Error');
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;
    const token = await UsersService.authorize(username, password);
    if (token) {
      res.json({
        data: token,
        msg: 'Login Success',
      });
    } else {
      res.status(401).json({
        msg: 'Login Error, Please Check Id/Password Again',
      });
    }
  }
}
export default new Controller();
