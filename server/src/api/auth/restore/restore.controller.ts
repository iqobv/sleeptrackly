import {
	BadRequestException,
	Body,
	Controller,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SendRestoreEmailDto } from './dto';
import { RestoreService } from './restore.service';

@Controller('auth/restore-account')
export class RestoreController {
	constructor(private readonly restoreService: RestoreService) {}

	@Post('send-email')
	@ApiOperation({ summary: 'Send restore account email' })
	@ApiOkResponse({
		description:
			'If a user with this email exists, a restore email will be sent',
	})
	async generateRestoreToken(@Body() dto: SendRestoreEmailDto) {
		return await this.restoreService.generateRestoreToken(dto);
	}

	@ApiOperation({ summary: 'Restore account using token' })
	@Post('restore')
	@ApiOkResponse({ description: 'Account restored successfully' })
	async restoreAccount(@Query('token') token: string) {
		if (!token) throw new BadRequestException('Token is required');

		return await this.restoreService.restoreAccount(token);
	}
}
