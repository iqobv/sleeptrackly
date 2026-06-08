import * as React from 'react';
import {
	Body,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Tailwind,
	Text,
} from 'react-email';

interface ConfirmationTemplateProps {
	domain: string;
	token: string;
}

export default function ConfirmationTemplate({
	domain,
	token,
}: ConfirmationTemplateProps) {
	const url = `${domain}/email-confirmation?token=${token}`;

	return (
		<Html>
			<Head />
			<Preview>Confirm your email for Sleeptrackly</Preview>
			<Tailwind>
				<Body className="text-black text-center">
					<Heading className="text-center text-3xl">
						Welcome to Sleeptrackly
					</Heading>
					<Text className="text-center">
						Please confirm your email address to activate your account and start
						tracking your sleep patterns. This helps us ensure the security of
						your data.
					</Text>
					<Link
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						style={
							{
								backgroundColor: '#3b82f6',
								color: '#ffffff',
								padding: '12px 24px',
								borderRadius: '8px',
								textDecoration: 'none',
								display: 'inline-block',
								fontWeight: 'bold',
								marginTop: '16px',
								textAlign: 'center',
							} as React.CSSProperties
						}
					>
						Confirm Email
					</Link>
					<Text>
						This link will expire in 1 hour. If you did not request this email
						you can safely ignore it.
					</Text>
					<Text>Thanks, for using our service!</Text>
				</Body>
			</Tailwind>
		</Html>
	);
}
