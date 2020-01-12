import 'mocha';
import { expect } from 'chai';

import request from 'supertest';
import { Sequelize } from 'sequelize';
import { taskModelInitialize } from '../component/tasks/taskDAL';
import { userModelInitialize } from '../component/users/usersDAL';
import Server from '../common/server';
import routes from '../routes';
import logger from '../config/logger';

describe('Authentication Controller Test', async () => {
  const app = await new Server().router(routes).installValidator();
  const sequelize: Sequelize = new Sequelize(process.env.DB_HOST);

  before(async () => {
    taskModelInitialize(sequelize);
    userModelInitialize(sequelize);
    await sequelize.authenticate();
    await sequelize.sync({
      force: true,
    });
  });

  it('User Register / Login Test', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'jj',
        password: 'test123',
      })
      .expect('Content-Type', /json/)
      .then(r => {
        logger.info(JSON.stringify(r.body));
        expect(r.body)
          .to.be.an('object')
          .that.has.property('data');
      });
    await request(app)
      .post('/auth/login')
      .send({
        username: 'jj',
        password: 'test123',
      })
      .expect('Content-Type', /json/)
      .then(r => {
        logger.info(JSON.stringify(r.body));
        expect(r.body)
          .to.be.an('object')
          .that.has.property('data');
      });
  });
});
