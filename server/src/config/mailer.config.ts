import { SmtpConfig } from '@config/schemas/smtp.schema';
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
		secure: config.MAIL_PORT === 465,
		port: config.MAIL_PORT,
		connectionTimeout: 10000,
		greetingTimeout: 10000,
		socketTimeout: 10000,
		auth: {
			user: config.MAIL_USER,
			pass: config.MAIL_PASSWORD,
		},
	});
