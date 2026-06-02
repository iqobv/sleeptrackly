import { Auth, Authorized } from '@libs/decorators';
import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Param,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserFcmTokenDto, FcmTokenDto } from './dto';
import { UserFcmTokenService } from './user-fcm-token.service';

@Auth()
@ApiTags('User FCM Token')
@Controller('fcm')
export class UserFcmTokenController {
	constructor(private readonly userFcmTokenService: UserFcmTokenService) {}

	/** Save FCM token for the user */
	@Post('save-token')
	public async saveFcmToken(
		@Authorized('id') userId: string,
		@Body() dto: CreateUserFcmTokenDto,
		@Headers('user-agent') userAgent?: string,
	): Promise<FcmTokenDto> {
		return await this.userFcmTokenService.create(
			userId,
			dto,
			userAgent || null,
		);
	}

	/** Get all FCM tokens for the user */
	@Get('tokens')
	public async getUserFcmTokens(
		@Authorized('id') userId: string,
	): Promise<FcmTokenDto[]> {
		return await this.userFcmTokenService.getTokensByUserId(userId);
	}

	/** Check if FCM token exists for the user */
	@Get('exists/:token')
	public async checkTokenExists(
		@Authorized('id') userId: string,
		@Param('token') token: string,
	): Promise<boolean> {
		return await this.userFcmTokenService.checkTokenExists(userId, token);
	}

	/** Remove FCM token for the user */
	@Delete('remove-token/:token')
	public async removeFcmToken(
		@Authorized('id') userId: string,
		@Param('token') token: string,
	): Promise<boolean> {
		return await this.userFcmTokenService.removeByToken(userId, token);
	}
}
