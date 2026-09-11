import React from 'react';
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

interface RestoreAccountTemplateProps {
	domain: string;
	token: string;
}

export const RestoreAccountTemplate = ({
	domain,
	token,
}: RestoreAccountTemplateProps) => {
	const url = `${domain}/restore-account?token=${token}`;

	return (
		<Html>
			<Head />
			<Preview>Restore your account on Sleeptackly!</Preview>
			<Tailwind>
				<Body className="text-black text-center">
					<Heading className="text-center text-3xl">
						Restore your account on Sleeptackly!
					</Heading>
					<Text className="text-center">
						We received a request to restore your account. Please click the
						button below to proceed with restoring your account.
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
						Restore Account
					</Link>
					<Text>
						This link will expire in 1 hour. If you did not request this email
						you can ignore it.
					</Text>
					<Text>
						Best regards, <br /> The Sleeptackly Team
					</Text>
				</Body>
			</Tailwind>
		</Html>
	);
};
