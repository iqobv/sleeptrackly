import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/decorators';
import { MessageResponse } from '@libs/types';
import {
	BadRequestException,
	Body,
	Controller,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendRestoreEmailDto } from './dto';
import { RestoreService } from './restore.service';

@ApiTags('Restore Account')
@Controller('auth/restore-account')
export class RestoreController {
	constructor(private readonly restoreService: RestoreService) {}

	/** Send restore account email */
	@Post('send-email')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.RESTORE.EMAIL_SENT)
	public async generateRestoreToken(
		@Body() dto: SendRestoreEmailDto,
	): Promise<MessageResponse> {
		return await this.restoreService.generateRestoreToken(dto);
	}

	/** Restore account using token */
	@Post('restore')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.RESTORE.RESTORE_SUCCESS)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED,
		ERROR_MESSAGES.TOKEN.INVALID,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	public async restoreAccount(
		@Query('token') token: string,
	): Promise<MessageResponse> {
		if (!token)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED);

		return await this.restoreService.restoreAccount(token);
	}
}
