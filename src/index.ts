import './config/env';
import Server from './common/server';
import routes from './routes';
import { Sequelize } from 'sequelize';
import * as DB from './config/sequelize';

import logger from './config/logger';

import * as http from 'http';
import os from 'os';

const port = parseInt(process.env.PORT);

const stopServer = async (
  server: http.Server,
  sequelize: Sequelize,
  signal?: string
): Promise<void> => {
  logger.info(`Stopping server with signal: ${signal}`);
  await sequelize.close();
  await server.close();
  process.exit();
};

async function runServer(): Promise<void> {
  const welcome = (p: number) => () =>
    logger.info(
      `up and running in ${process.env.NODE_ENV ||
        'development'} @: ${os.hostname()} on port: ${p}`
    );

  const sequelize = DB.initialize();
  const app = await new Server().router(routes).installValidator();
  const server = http.createServer(app).listen(port, welcome(port));
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.sync({
    //   force: true,
    // });
  } catch (e) {
    logger.error(e);
    await stopServer(server, sequelize);
    throw e;
  }
}

runServer()
  .then(() => {
    logger.info('run server successful');
  })
  .catch(err => {
    logger.error(err);
  });
