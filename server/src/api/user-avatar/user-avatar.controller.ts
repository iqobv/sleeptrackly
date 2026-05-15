import { Auth, Authorized } from '@libs/decorators';
import {
	BadRequestException,
	Controller,
	Delete,
	HttpStatus,
	ParseFilePipeBuilder,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBadGatewayResponse,
	ApiBody,
	ApiConsumes,
	ApiExcludeEndpoint,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { UserAvatarDto } from './dto';
import { UserAvatarService } from './user-avatar.service';

@ApiTags('User Avatar')
@Controller('user-avatar')
export class UserAvatarController {
	constructor(private readonly userAvatarService: UserAvatarService) {}

	@ApiOperation({ summary: 'Upload user avatar' })
	@ApiBody({ type: 'file' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				avatar: {
					type: 'file',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		},
	})
	@ApiOkResponse({ type: UserAvatarDto })
	@ApiBadGatewayResponse({ description: 'Error uploading image' })
	@Auth()
	@Post('upload')
	@UseInterceptors(FileInterceptor('avatar'))
	async upload(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: /(jpg|jpeg|png|webp)$/,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
					fileIsRequired: true,
				}),
		)
		file: Express.Multer.File,
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
	@Post('fix-urls')
	async fixAvatarUrls() {
		return await this.userAvatarService.fixAvatarUrls();
	}
}
