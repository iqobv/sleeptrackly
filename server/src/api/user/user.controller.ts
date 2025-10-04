import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { UpdateUserDto, UserDto } from './dto';
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

	@ApiOperation({
		summary: 'Search for a user by username',
	})
	@Get('search')
	async findByUsername(@Query('query') query: string) {
		return await this.userService.findByUsername(query);
	}
}
