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
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UploadUserAvatarDto, UserAvatarDto } from './dto';
import { UserAvatarService } from './user-avatar.service';

@Auth()
@ApiTags('User Avatar')
@Controller('user-avatar')
export class UserAvatarController {
	constructor(private readonly userAvatarService: UserAvatarService) {}

	/** Upload avatar */
	@Post('upload')
	@ApiBody({ type: UploadUserAvatarDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('avatar'))
	@ApiOkResponse({ type: UserAvatarDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.AVATAR.UPLOAD_FAILED)
	@ApiErrorResponse(HttpStatus.FORBIDDEN, {
		...ERROR_MESSAGES.AVATAR.CHANGE_BANNED,
		meta: { endsAt: new Date() },
	})
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	public async upload(
		@UploadedFile(ImageValidationPipe()) file: Express.Multer.File,
		@Authorized('id') userId: string,
	): Promise<UserAvatarDto> {
		if (!file)
			throw new BadRequestException(ERROR_MESSAGES.AVATAR.FILE_NOT_PROVIDED);

		return await this.userAvatarService.upload(file, userId);
	}

	/** Delete avatar */
	@Delete()
	public async deleteAvatar(@Authorized('id') userId: string): Promise<UserAvatarDto> {
		return await this.userAvatarService.deleteAvatar(userId);
	}
}
