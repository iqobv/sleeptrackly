import passport from 'passport';
import { localeStrategy } from '../strategies/local.strategy.js';
import userService from '../services/user.service.js';

passport.use(localeStrategy);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await userService.getUserById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export default passport;
