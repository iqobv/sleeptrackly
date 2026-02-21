'use client';

import { CgSandClock } from 'react-icons/cg';
import EmailConfirmationStateWrapper from './EmailConfirmationStateWrapper';

const EmailConfirmationProccesing = () => {
	return (
		<EmailConfirmationStateWrapper icon={CgSandClock}>
			<h2>Processing...</h2>
			<p>
				We are currently processing your email confirmation. Please wait a
				moment while we verify your email address. This may take a few seconds.
				Thank you for your patience!
			</p>
		</EmailConfirmationStateWrapper>
	);
};

export default EmailConfirmationProccesing;
