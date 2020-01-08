import logger from '../../config/logger';
import { User } from './usersDAL';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class UsersService {
  async register(username: string, password: string): Promise<User> {
    try {
      const userExist = await User.findOne({ where: { username }, raw: true });
      if (!userExist) {
        const createdUser = await User.create({ username, password });
        return createdUser;
      } else {
        return null;
      }
    } catch (e) {
      logger.error(e);
      return null;
    }
  }

  async auth(username: string, password: string): Promise<User> {
    const userExist = await User.findOne({ where: { username } });
    if (userExist) {
      if (userExist.validPassword(password)) {
        return userExist;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async getUser(userId: number): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: userId }, raw: true });
      return user;
    } catch (e) {
      logger.error(e);
      return null;
    }
  }
}

export default new UsersService();
