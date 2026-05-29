import { PasswordRecoveryDto } from '@api/user/dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
	ClientInfo,
} from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { setAuthCookies } from '@libs/utils';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.PASSWORD_RECOVERY.EMAIL_SENT,
	)
	@HttpCode(HttpStatus.OK)
	@Post('email')
	async sendEmailForResetPassword(@Body() dto: SendEmailDto) {
		return await this.passwordRecoveryService.sendEmailForResetPassword(
			dto.email,
		);
	}

	@ApiOperation({ summary: 'Reset password' })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.TOKEN.NOT_FOUND,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	@ApiErrorResponse(HttpStatus.CONFLICT, [
		ERROR_MESSAGES.USER.OLD_PASSWORD_MISMATCH,
		ERROR_MESSAGES.USER.NEW_PASSWORD_SAME_AS_OLD,
	])
	@ApiErrorResponse(HttpStatus.FORBIDDEN, ERROR_MESSAGES.USER.ACCOUNT_DELETED)
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.PASSWORD_RECOVERY.RESET_SUCCESS,
	)
	@HttpCode(HttpStatus.OK)
	@Post('reset')
	async resetPassword(
		@ClientInfo() clientInfo: ClientInfoDto,
		@Body() dto: ResetPasswordDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } =
			await this.passwordRecoveryService.resetPassword(dto, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.PASSWORD_RECOVERY.RESET_SUCCESS;
	}

	@ApiOperation({ summary: 'Change password' })
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.PASSWORD_RECOVERY.PASSWORD_CHANGED,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.CONFLICT, [
		ERROR_MESSAGES.USER.OLD_PASSWORD_MISMATCH,
		ERROR_MESSAGES.USER.NEW_PASSWORD_SAME_AS_OLD,
	])
	@ApiErrorResponse(HttpStatus.FORBIDDEN, ERROR_MESSAGES.USER.ACCOUNT_DELETED)
	@HttpCode(HttpStatus.OK)
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@Auth()
	@Get('need-old-password')
	async needOldPassword(@Authorized('id') userId: string) {
		return this.passwordRecoveryService.needOldPassword(userId);
	}
}
