import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import Mail from 'nodemailer/lib/mailer';
import { getMailerConfig } from 'src/config';
import { SendEmailDto } from './dto';
import { ConfirmationTemplate, ResetPasswordTemplate } from './templates';

@Injectable()
export class MailService {
	private readonly transport: ReturnType<typeof getMailerConfig>;

	constructor(private readonly configService: ConfigService) {
		this.transport = getMailerConfig(configService);
	}

	async sendVerificationEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('CLIENT_URL');
		const html = await render(ConfirmationTemplate({ domain, token }));

		return this.sendEmail({
			recipients: [email],
			subject: 'Confirm your email',
			html,
		});
	}

	async sendResetPasswordEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('CLIENT_URL');
		const html = await render(ResetPasswordTemplate({ domain, token }));

		return this.sendEmail({
			recipients: [email],
			subject: 'Reset your password',
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
