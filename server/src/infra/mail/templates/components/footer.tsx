import React from 'react';
import { Link, Section, Text } from 'react-email';
import Divider from './divider';

interface FooterProps {
	expiresIn?: string;
	customText?: string;
}

const Footer = ({ expiresIn, customText }: FooterProps) => {
	const footerText =
		customText ||
		`If you did not request this email, you can safely ignore it. This link
					will expire in ${expiresIn}.`;

	return (
		<Section className="py-1 font-[14px]">
			{expiresIn && (
				<Text className="font-base text-fg-2 mt-8 mb-2 leading-[24px] text-fg-2 dark:text-fg-2-dark">
					{footerText}
				</Text>
			)}
			<Divider />
			<Section className="py-2">
				<Text className="font-base text-fg-2 m-0 leading-[24px] text-fg-2 dark:text-fg-2-dark">
					Thank you for using Sleeptrackly!
					<br />
					The Sleeptrackly Team
					<br />
					<Link
						href="https://sleeptrackly.com"
						className="text-link dark:text-link-dark underline no-underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						sleeptrackly.com
					</Link>
					<br />
					<Link
						href="mailto:support@sleeptrackly.com"
						className="text-link dark:text-link-dark underline no-underline"
					>
						support@sleeptrackly.com
					</Link>
				</Text>
			</Section>
		</Section>
	);
};

export default Footer;
