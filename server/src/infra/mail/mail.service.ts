import { getMailerConfig } from '@config/mailer.config';
import { EnvService } from '@infra/env/env.service';
import { Injectable } from '@nestjs/common';
import { pretty, render } from '@react-email/render';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SmtpConfig, smtpEnvSchema } from '../../config/schemas/smtp.schema';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import { RestoreAccountTemplate } from './templates/restore-account.template';

type SendNotificationResponse = Promise<
	SMTPTransport.SentMessageInfo | undefined
>;

@Injectable()
export class MailService {
	private readonly domain: string;
	private readonly transport: ReturnType<typeof getMailerConfig>;
	private readonly mailConfig: SmtpConfig;

	constructor(private readonly envService: EnvService) {
		this.mailConfig = envService.getGroup(smtpEnvSchema);

		this.transport = getMailerConfig(this.mailConfig);
		this.domain = envService.get('CLIENT_URL');
	}

	public async sendVerificationEmail(
		email: string,
		token: string,
	): SendNotificationResponse {
		const html = await pretty(
			await render(ConfirmationTemplate({ domain: this.domain, token })),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Confirm your email',
			html,
		});
	}

	public async sendResetPasswordEmail(
		email: string,
		token: string,
	): SendNotificationResponse {
		const html = await pretty(
			await render(ResetPasswordTemplate({ domain: this.domain, token })),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Reset your password',
			html,
		});
	}

	public async sendRestoreAccountEmail(
		email: string,
		token: string,
	): SendNotificationResponse {
		const html = await pretty(
			await render(RestoreAccountTemplate({ domain: this.domain, token })),
		);

		return await this.sendEmail({
			recipients: [email],
			subject: 'Restore your account',
			html,
		});
	}

	public async sendEmail(dto: SendEmailDto): SendNotificationResponse {
		const { from, recipients, subject, html } = dto;

		const options: Mail.Options = {
			from:
				from ??
				`"${this.mailConfig.MAIL_FROM_NAME}" <${this.mailConfig.MAIL_FROM_ADDRESS}>`,
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
