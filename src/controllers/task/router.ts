import express from 'express';
import controller from './controller';
import passport from 'passport';

export default express
  .Router()
  .get(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.getTasks
  )
  .get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.getTask
  )
  .post(
    '/',
    passport.authenticate('jwt', { session: false }),
    controller.createTask
  )
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.modifyTask
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    controller.deleteTask
  );
