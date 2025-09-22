export class SendEmailDto {
	from?: string;
	recipients: string[];
	subject: string;
	html: string;
	text?: string;
	placeholder?: Record<string, string>;
}
