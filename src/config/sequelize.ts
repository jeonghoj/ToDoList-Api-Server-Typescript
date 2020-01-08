import { Sequelize } from 'sequelize';
import { taskModelInitialize } from '../component/tasks/taskDAL';
import { userModelInitialize } from '../component/users/usersDAL';
import dotenv from 'dotenv';
import logger from './logger';
dotenv.config();

export function initialize(): Sequelize {
  const sequelize = new Sequelize(process.env.DB_HOST!);
  taskModelInitialize(sequelize);
  userModelInitialize(sequelize);
  return sequelize;
}
