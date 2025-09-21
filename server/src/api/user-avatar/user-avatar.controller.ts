import {
	BadRequestException,
	Controller,
	Delete,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { UserAvatarService } from './user-avatar.service';

@Controller('user-avatar')
export class UserAvatarController {
	constructor(private readonly userAvatarService: UserAvatarService) {}

	@Auth()
	@Post('upload')
	@UseInterceptors(FileInterceptor('avatar'))
	async upload(
		@UploadedFile() file: Express.Multer.File,
		@Authorized('id') userId: string,
	) {
		if (!file) throw new BadRequestException('File not provided');
		return this.userAvatarService.upload(file, userId);
	}

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
}
