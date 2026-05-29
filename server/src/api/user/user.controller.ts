import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchDto, UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ type: UserDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.CONFLICT, [
		ERROR_MESSAGES.USER.USERNAME_ALREADY_TAKEN,
		ERROR_MESSAGES.USER.ALREADY_EXISTS,
		{
			...ERROR_MESSAGES.USER.USERNAME_CHANGE_BANNED,
			meta: { endsAt: new Date() },
		},
	])
	@Auth()
	@Patch('me')
	async updateUser(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	) {
		return await this.userService.update(userId, dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Search for a user by username' })
	@Get('search')
	async findByUsername(
		@Query() queries: SearchDto,
		@Authorized('id') userId: string,
	) {
		const { username } = queries;

		return await this.userService.findManyByUsername(username, userId);
	}
}
