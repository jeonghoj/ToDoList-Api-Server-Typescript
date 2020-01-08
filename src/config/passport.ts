import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsersService from '../component/users/usersService';
import logger from './logger';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: number;
      username: string;
    }
  }
}

export default (): void => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      async (jwtPayload, done): Promise<void> => {
        try {
          const user = await UsersService.getUser(jwtPayload.id);
          if (user !== null) {
            return done(null, {
              id: user.id,
              username: user.username,
            });
          } else {
            return done(null, false);
          }
        } catch (e) {
          logger.error(e);
          return done(e);
        }
      }
    )
  );
};
