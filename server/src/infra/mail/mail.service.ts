import { getMailerConfig } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto';
import {
	ConfirmationTemplate,
	ResetPasswordTemplate,
	RestoreAccountTemplate,
} from './templates';

@Injectable()
export class MailService {
	private readonly domain: string;
	private readonly transport: ReturnType<typeof getMailerConfig>;

	constructor(private readonly configService: ConfigService) {
		this.transport = getMailerConfig(configService);
		this.domain = this.configService.getOrThrow<string>('CLIENT_URL');
	}

	async sendVerificationEmail(email: string, token: string) {
		const html = await render(
			ConfirmationTemplate({ domain: this.domain, token }),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Confirm your email',
			html,
		});
	}

	async sendResetPasswordEmail(email: string, token: string) {
		const html = await render(
			ResetPasswordTemplate({ domain: this.domain, token }),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Reset your password',
			html,
		});
	}

	async sendRestoreAccountEmail(email: string, token: string) {
		const html = await render(
			RestoreAccountTemplate({ domain: this.domain, token }),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Restore your account',
			html,
		});
	}

	async sendEmail(dto: SendEmailDto) {
		const { from, recipients, subject, html } = dto;

		const options: Mail.Options = {
			from:
				from ??
				`"${this.configService.getOrThrow<string>('MAIL_FROM_NAME')}" <${this.configService.getOrThrow<string>('MAIL_FROM_ADDRESS')}>`,
			to: [...recipients],
			subject,
			html,
		};

		try {
			const result = await this.transport.sendMail(options);

			return result;
		} catch (error) {
			console.log('error', error);
		}
	}
}
