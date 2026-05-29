import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse } from '@libs/decorators';
import {
	BadRequestException,
	Body,
	Controller,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendRestoreEmailDto } from './dto';
import { RestoreService } from './restore.service';

@ApiTags('Restore Account')
@Controller('auth/restore-account')
export class RestoreController {
	constructor(private readonly restoreService: RestoreService) {}

	@ApiOperation({ summary: 'Send restore account email' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.RESTORE.EMAIL_SENT)
	@Post('send-email')
	async generateRestoreToken(@Body() dto: SendRestoreEmailDto) {
		return await this.restoreService.generateRestoreToken(dto);
	}

	@ApiOperation({ summary: 'Restore account using token' })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED,
		ERROR_MESSAGES.TOKEN.INVALID,
		ERROR_MESSAGES.TOKEN.EXPIRED,
	])
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.RESTORE.RESTORE_SUCCESS)
	@Post('restore')
	async restoreAccount(@Query('token') token: string) {
		if (!token)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED);

		return await this.restoreService.restoreAccount(token);
	}
}
