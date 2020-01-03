import 'mocha';
import { expect } from 'chai';

import { Sequelize } from 'sequelize';
import { User, userModelInitialize } from '../component/users/usersDAL';
import { Task, taskModelInitialize } from '../component/tasks/taskDAL';

import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

describe('Sequelize Init Test', () => {
  // const sequelize = new Sequelize(process.env.DB_HOST);
  let sequelize: Sequelize;
  before(async () => {
    sequelize = new Sequelize('mysql://root:password@localhost:3308/todolist');
    taskModelInitialize(sequelize);
    userModelInitialize(sequelize);
    await sequelize.authenticate();
    await sequelize.sync({
      force: true,
    });
  });

  it('should user', async () => {
    const user = await User.create({
      username: 'jj',
      password: 'test123',
    });
    User.findOne({ where: { id: user.id } })
      .then((r: User | null) => {
        expect(r!.username).equal(user.username);
        expect(r!.password).equal(user.password);
      })
      .catch(error => {
        console.log(error);
      });
  });

  // afterEach(async () => {
  //   await sequelize.close();
  // });
});
