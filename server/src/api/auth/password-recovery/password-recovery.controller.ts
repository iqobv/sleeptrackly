import { PasswordRecoveryDto } from '@api/user/dto';
import { Auth, Authorized, ClientInfo } from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { setAuthCookies } from '@libs/utils';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { ResetPasswordDto, SendEmailDto } from './dto';
import { PasswordRecoveryService } from './password-recovery.service';

@ApiTags('Password Recovery')
@Controller('auth/password-recovery')
export class PasswordRecoveryController {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({ summary: 'Send email for reset password' })
	@ApiOkResponse({ type: Boolean })
	@Post('email')
	async sendEmailForResetPassword(@Body() dto: SendEmailDto) {
		return this.passwordRecoveryService.sendEmailForResetPassword(dto.email);
	}

	@ApiOperation({ summary: 'Reset password' })
	@Post('reset')
	async resetPassword(
		@ClientInfo() clientInfo: ClientInfoDto,
		@Body() dto: ResetPasswordDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } =
			await this.passwordRecoveryService.resetPassword(dto, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return { message: 'Password reset successfully' };
	}

	@ApiOperation({ summary: 'Change password' })
	@ApiOkResponse({ type: Boolean })
	@ApiNotFoundResponse({ description: 'User not found' })
	@ApiConflictResponse({
		description: 'Wrong password<br/>Same password',
	})
	@Auth()
	@Post('change')
	async changePassword(
		@Authorized('id') userId: string,
		@Body() dto: PasswordRecoveryDto,
	) {
		return this.passwordRecoveryService.changePassword(userId, dto);
	}

	@ApiOperation({ summary: 'Need old password' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Get('need-old-password')
	async needOldPassword(@Authorized('id') userId: string) {
		return this.passwordRecoveryService.needOldPassword(userId);
	}
}
