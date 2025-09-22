import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(private readonly userService: UserService) {
		super();
	}

	serializeUser(user: any, done: Function) {
		done(null, user.id);
	}

	async deserializeUser(id: string, done: Function) {
		try {
			const user = await this.userService.getById(id, true);
			if (!user) return done(null, null);
			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
}
