'use client';

import { SectionHeader } from '@shared/ui';
import { IoMdCheckmark } from 'react-icons/io';
import { EmailConfirmationStateWrapper } from './EmailConfirmationStateWrapper';

export const EmailConfirmationSuccess = () => {
	return (
		<EmailConfirmationStateWrapper icon={IoMdCheckmark}>
			<SectionHeader
				title="Success!"
				titleProps={{ variant: 'h2', as: 'h1' }}
				description="Your email has been successfully confirmed. You can now access all
				features of our application. Thank you for verifying your email address!"
				textAlign="center"
			/>
		</EmailConfirmationStateWrapper>
	);
};
