import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { SearchDto, UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ type: UserDto })
	@ApiConflictResponse({ description: 'User already exists' })
	@Auth()
	@Patch('me')
	async updateUser(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	) {
		return await this.userService.update(userId, dto);
	}

	@Auth()
	@ApiOperation({
		summary: 'Search for a user by username',
	})
	@Get('search')
	async findByUsername(
		@Query() queries: SearchDto,
		@Authorized('id') userId: string,
	) {
		const { username } = queries;

		return await this.userService.findManyByUsername(username, userId);
	}
}
