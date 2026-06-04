import { isDev } from '@libs/utils';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const getMailerConfig = (
	confgigService: ConfigService,
): nodemailer.Transporter<
	SMTPTransport.SentMessageInfo,
	SMTPTransport.Options
> =>
	nodemailer.createTransport({
		host: confgigService.getOrThrow<string>('MAIL_HOST'),
		secure: !!isDev(confgigService),
		port: confgigService.getOrThrow<number>('MAIL_PORT'),
		auth: {
			user: confgigService.getOrThrow<string>('MAIL_USER'),
			pass: confgigService.getOrThrow<string>('MAIL_PASSWORD'),
		},
	});
