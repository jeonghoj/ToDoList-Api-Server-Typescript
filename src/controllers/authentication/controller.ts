import UsersService from '../../component/users/usersService';
import { Request, Response } from 'express';
import logger from '../../config/logger';
import * as jwt from 'jsonwebtoken';

export class Controller {
  async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const createdUser = await UsersService.register(username, password);
      if (createdUser !== null) {
        const token = jwt.sign(
          {
            id: createdUser.id,
            username: createdUser.username,
          },
          process.env.TOKEN_SECRET
        );
        res.status(201).json({
          data: token,
          msg: 'Register Success',
        });
      } else {
        res.status(409).json({
          msg: 'User already exit',
        });
      }
    } catch (e) {
      logger.error(e);
      res.status(500).json({
        msg: 'Server Error',
      });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const user = await UsersService.auth(username, password);
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.TOKEN_SECRET
      );
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
