import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user-response.dto';
import { UsersSearchResultDto } from './dto/users-search-result.dto';
import { UserService } from './user.service';

@Auth()
@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	/** Update user */
	@Patch('me')
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
	public async updateUser(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto,
	): Promise<UserDto> {
		return await this.userService.update(userId, dto);
	}

	/** Search users by username */
	@Get('search')
	@ApiOkResponse({ type: [UsersSearchResultDto] })
	public async findByUsername(
		@Query() queries: SearchDto,
		@Authorized('id') userId: string,
	): Promise<UsersSearchResultDto[]> {
		const { username } = queries;

		return await this.userService.findManyByUsername(username, userId);
	}
}
