import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { PasswordRecoveryDto } from 'src/api/user/dto';
import { Auth, Authorized } from 'src/libs/decorators';
import { ResetPasswordDto, SendEmailDto } from './dto';
import { PasswordRecoveryService } from './password-recovery.service';

@ApiTags('Password Recovery')
@Controller('auth/password-recovery')
export class PasswordRecoveryController {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService,
	) {}

	@ApiOperation({ summary: 'Send email for reset password' })
	@ApiOkResponse({ type: Boolean })
	@Post('email')
	async sendEmailForResetPassword(@Body() dto: SendEmailDto) {
		return this.passwordRecoveryService.sendEmailForResetPassword(dto.email);
	}

	@ApiOperation({ summary: 'Reset password' })
	@Post('reset')
	async resetPassword(@Req() req: Request, @Body() dto: ResetPasswordDto) {
		return this.passwordRecoveryService.resetPassword(req, dto);
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
