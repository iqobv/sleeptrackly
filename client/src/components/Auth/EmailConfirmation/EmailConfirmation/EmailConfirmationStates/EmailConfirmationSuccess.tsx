'use client';

import { IoMdCheckmark } from 'react-icons/io';
import { EmailConfirmationStateWrapper } from './EmailConfirmationStateWrapper';

export const EmailConfirmationSuccess = () => {
	return (
		<EmailConfirmationStateWrapper icon={IoMdCheckmark}>
			<h2>Success!</h2>
			<p>
				Your email has been successfully confirmed. You can now access all
				features of our application. Thank you for verifying your email address!
			</p>
		</EmailConfirmationStateWrapper>
	);
};
