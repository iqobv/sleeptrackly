import { PasswordRecoveryDto } from '@api/user/dto/password.dto';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { ClientInfo } from '@libs/decorators/client-info.decorator';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { setAuthCookies } from '@libs/utils/cookie.util';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { PasswordRecoveryService } from './password-recovery.service';

@ApiTags('Password Recovery')
@Controller('auth/password-recovery')
export class PasswordRecoveryController {
	constructor(
		private readonly passwordRecoveryService: PasswordRecoveryService,
		private readonly configService: ConfigService,
	) {}

	/** Send email for reset password */
	@Post('email')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.PASSWORD_RECOVERY.EMAIL_SENT,
	)
	@HttpCode(HttpStatus.OK)
	public async sendEmailForResetPassword(
		@Body() dto: SendEmailDto,
	): Promise<MessageResponse> {
		return await this.passwordRecoveryService.sendEmailForResetPassword(
			dto.email,
		);
	}

	/** Reset password */
	@Post('reset')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.PASSWORD_RECOVERY.RESET_SUCCESS,
	)
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
	@HttpCode(HttpStatus.OK)
	public async resetPassword(
		@ClientInfo() clientInfo: ClientInfoDto,
		@Body() dto: ResetPasswordDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const { accessToken, refreshToken } =
			await this.passwordRecoveryService.resetPassword(dto, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.PASSWORD_RECOVERY.RESET_SUCCESS;
	}

	/** Change password */
	@Post('change')
	@Auth()
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
	public async changePassword(
		@Authorized('id') userId: string,
		@Body() dto: PasswordRecoveryDto,
	): Promise<MessageResponse> {
		return this.passwordRecoveryService.changePassword(userId, dto);
	}

	/** Check if old password is needed for password change */
	@Get('need-old-password')
	@Auth()
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	public async needOldPassword(
		@Authorized('id') userId: string,
	): Promise<boolean> {
		return this.passwordRecoveryService.needOldPassword(userId);
	}
}
