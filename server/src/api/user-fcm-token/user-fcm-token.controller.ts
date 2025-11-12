import { Body, Controller, Headers, Post } from '@nestjs/common';
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
}
