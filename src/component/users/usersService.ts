import logger from '../../config/logger';
import { User } from './usersDAL';
import UserErrorHandler from './userErrorHandler';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class UsersService {
  async register(username: string, password: string): Promise<User | null> {
    try {
      const userExist = await User.findOne({ where: { username } });
      if (!userExist) {
        return await User.create({ username, password });
      } else {
        return null;
      }
    } catch (e) {
      logger.error(e);
      new UserErrorHandler(500, 'DB Error');
      return null;
    }
  }

  async authorize(username: string, password: string): Promise<string | null> {
    const userExist = await User.findOne({ where: { username } });
    if (userExist) {
      if (await userExist.validPassword(password)) {
        logger.info(process.env.TOKEN_SECRET!);
        const token = jwt.sign(userExist.toJSON(), process.env.TOKEN_SECRET!);
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async getUserById(username: string): Promise<User | null> {
    try {
      const getUser = await User.findOne({ where: { username } });
      return getUser;
    } catch (e) {
      logger.error(e);
      throw new UserErrorHandler(500, 'DB Error');
    }
  }
}

export default new UsersService();
