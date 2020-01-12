import 'mocha';
import { assert, expect } from 'chai';

import { Sequelize } from 'sequelize';
import { userModelInitialize } from '../component/users/usersDAL';
import { taskModelInitialize } from '../component/tasks/taskDAL';

import * as dotenv from 'dotenv';
import usersService from '../component/users/usersService';

dotenv.config({ path: '../../.env' });

describe('UsersService create User Test', async () => {
  let sequelize: Sequelize;

  const user = {
    username: 'jj',
    password: 'test123',
  };

  before(async () => {
    sequelize = new Sequelize(process.env.DB_HOST);
    taskModelInitialize(sequelize);
    userModelInitialize(sequelize);
    await sequelize.authenticate();
    await sequelize.sync({
      force: true,
    });
  });

  it('should create user', async () => {
    try {
      const result = await usersService.register(user.username, user.password);
      expect(result?.username).to.be.equal(user.username);
      expect(result?.validPassword(user.password)).equal(true);
    } catch (e) {
      throw new Error(e);
    }
  });

  it('check if duplicate user', async () => {
    usersService.register(user.username, user.password).then(r => {
      assert.isNull(r);
    });
  });

  it('login user', async () => {
    try {
      const loginUser = await usersService.auth(user.username, user.password);
      assert.isNotNull(loginUser);
      expect(loginUser.username).to.be.equal(user.username);
      expect(loginUser.validPassword(user.password)).to.be.equal(true);
    } catch (e) {
      throw new Error(e);
    }
  });

  after(async () => {
    await sequelize.close();
  });
});
