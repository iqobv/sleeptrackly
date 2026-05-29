import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { ImageValidationPipe } from '@libs/pipes';
import {
	BadRequestException,
	Controller,
	Delete,
	HttpStatus,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiExcludeEndpoint,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { UploadUserAvatarDto, UserAvatarDto } from './dto';
import { UserAvatarService } from './user-avatar.service';

@ApiTags('User Avatar')
@Controller('user-avatar')
export class UserAvatarController {
	constructor(private readonly userAvatarService: UserAvatarService) {}

	@ApiOperation({ summary: 'Upload user avatar' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: UploadUserAvatarDto })
	@ApiOkResponse({ type: UserAvatarDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.AVATAR.UPLOAD_FAILED)
	@ApiErrorResponse(HttpStatus.FORBIDDEN, {
		...ERROR_MESSAGES.AVATAR.CHANGE_BANNED,
		meta: { endsAt: new Date() },
	})
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@Auth()
	@Post('upload')
	@UseInterceptors(FileInterceptor('avatar'))
	async upload(
		@UploadedFile(ImageValidationPipe()) file: Express.Multer.File,
		@Authorized('id') userId: string,
	) {
		if (!file) throw new BadRequestException('File not provided');
		return this.userAvatarService.upload(file, userId);
	}

	@ApiOperation({ summary: 'Delete user avatar' })
	@ApiOkResponse({ type: UserAvatarDto })
	@Auth()
	@Delete()
	async deleteAvatar(@Authorized('id') userId: string) {
		return this.userAvatarService.deleteAvatar(userId);
	}

	@Auth('ADMIN')
	@ApiExcludeEndpoint()
	@Post('all')
	async createForAllUsers() {
		return this.userAvatarService.createForAllUsers();
	}

	@Auth('ADMIN')
	@ApiExcludeEndpoint()
	@Post('fix-urls')
	async fixAvatarUrls() {
		return await this.userAvatarService.fixAvatarUrls();
	}
}
