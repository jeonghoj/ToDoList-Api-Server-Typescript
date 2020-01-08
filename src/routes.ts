import { Application } from 'express';
import tasksRouter from './controllers/task/router';
import authenticationRouter from './controllers/authentication/router';

export default function routes(app: Application): void {
  app.use('/auth', authenticationRouter);
  app.use('/task', tasksRouter);
}
