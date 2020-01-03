import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsersService from '../component/users/usersService';
import logger from './logger';

export default (): void => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
      },
      async (jwtPayload, done): Promise<void> => {
        try {
          const user = await UsersService.getUserById(jwtPayload.id);
          if (user) {
            return done(null, user);
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
