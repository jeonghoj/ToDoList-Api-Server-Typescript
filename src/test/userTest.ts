import 'mocha';
import { assert, expect } from 'chai';

import { Sequelize } from 'sequelize';
import { userModelInitialize } from '../component/users/usersDAL';
import { taskModelInitialize } from '../component/tasks/taskDAL';

import * as dotenv from 'dotenv';
import usersService from '../component/users/usersService';
import logger from '../config/logger';
dotenv.config({ path: '../../.env' });

describe('UsersService create User Test', () => {
  let sequelize: Sequelize;

  const user = {
    username: 'jj',
    password: 'test123',
  };

  before(async () => {
    sequelize = new Sequelize('mysql://root:password@localhost:3308/todolist');
    taskModelInitialize(sequelize);
    userModelInitialize(sequelize);
    await sequelize.authenticate();
    await sequelize.sync({
      force: true,
    });
  });

  it('should create user', async () => {
    const result = await usersService.register(user.username, user.password);
    expect(result?.username).to.be.equal(user.username);
    expect(result?.validPassword(user.password)).equal(true);
  });

  it('check if duplicate user', async () => {
    usersService.register(user.username, user.password).then(r => {
      logger.info(`${r}`);
      assert.isNull(r);
    });
  });

  it('login user', async () => {
    const token = await usersService.auth(user.username, user.password);
    logger.info(`${token}`);
    assert.isNotNull(token);
  });

  // afterEach(async () => {
  //   await sequelize.close();
  // });
});
