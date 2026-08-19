import { SmtpConfig } from '@config/schemas/smtp.schema';
import { IS_PROD_ENV } from '@libs/utils/is-dev.util';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const getMailerConfig = (
	config: SmtpConfig,
): nodemailer.Transporter<
	SMTPTransport.SentMessageInfo,
	SMTPTransport.Options
> =>
	nodemailer.createTransport({
		host: config.MAIL_HOST,
		secure: IS_PROD_ENV,
		port: config.MAIL_PORT,
		auth: {
			user: config.MAIL_USER,
			pass: config.MAIL_PASSWORD,
		},
	});
