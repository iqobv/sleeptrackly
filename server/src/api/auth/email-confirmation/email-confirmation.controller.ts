import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { ConfirmationDto } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';

@ApiTags('Email Confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	@ApiOperation({ summary: 'Email confirmation' })
	@Post()
	@HttpCode(HttpStatus.OK)
	async newVerification(@Req() req: Request, @Body() dto: ConfirmationDto) {
		return await this.emailConfirmationService.newVerification(req, dto);
	}

	@ApiOperation({ summary: 'Resend email confirmation' })
	@Auth()
	@Post('/resend')
	async sendVerificationEmail(@Authorized('id') userId: string) {
		return await this.emailConfirmationService.sendVerificationEmail(userId);
	}
}
