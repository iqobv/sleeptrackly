'use client';

import { SectionHeader } from '@shared/ui';
import { CgSandClock } from 'react-icons/cg';
import { EmailConfirmationStateWrapper } from './EmailConfirmationStateWrapper';

export const EmailConfirmationProccesing = () => {
	return (
		<EmailConfirmationStateWrapper icon={CgSandClock}>
			<SectionHeader
				title="Processing..."
				description="We are currently processing your email confirmation. Please wait a
				moment while we verify your email address. This may take a few seconds.
				Thank you for your patience!"
				textAlign="center"
				titleProps={{ variant: 'h2', as: 'h1' }}
			/>
		</EmailConfirmationStateWrapper>
	);
};
