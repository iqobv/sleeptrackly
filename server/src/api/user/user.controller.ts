import { Body, Controller, Patch } from '@nestjs/common';
import { Auth, Authorized } from 'src/libs/decorators';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Patch('me')
	async updateUser(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	) {
		return await this.userService.update(userId, dto);
	}
}
