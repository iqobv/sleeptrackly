import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateUserFcmTokenDto } from './dto';
import { UserFcmTokenService } from './user-fcm-token.service';

@Controller('fcm')
export class UserFcmTokenController {
	constructor(private readonly userFcmTokenService: UserFcmTokenService) {}

	@Auth()
	@ApiOperation({ summary: 'Save FCM token for the user' })
	@Post('save-token')
	async saveFcmToken(
		@Authorized('id') userId: string,
		@Body() dto: CreateUserFcmTokenDto,
		@Headers('user-agent') userAgent?: string,
	) {
		return await this.userFcmTokenService.create(
			userId,
			dto,
			userAgent || null,
		);
	}

	@Auth()
	@ApiOperation({ summary: 'Get FCM tokens for the user' })
	@Get('tokens')
	async getUserFcmTokens(@Authorized('id') userId: string) {
		return await this.userFcmTokenService.getTokensByUserId(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Check if FCM token exists for the user' })
	@Get('exists/:token')
	async checkTokenExists(
		@Authorized('id') userId: string,
		@Param('token') token: string,
	) {
		return await this.userFcmTokenService.checkTokenExists(userId, token);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove FCM token for the user' })
	@Delete('remove-token')
	async removeFcmToken(
		@Authorized('id') userId: string,
		@Body() dto: CreateUserFcmTokenDto,
	) {
		return await this.userFcmTokenService.removeByToken(userId, dto.token);
	}
}
