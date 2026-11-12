import * as React from 'react';
import { Heading, Text } from 'react-email';
import { BaseEmailProps } from './base-email-props.types';
import Button from './components/button';
import Footer from './components/footer';
import Wrapper from './components/wrapper';
import { baseEmailMock } from './mocks';

const ResetPasswordTemplate = ({ url }: BaseEmailProps) => {
	return (
		<Wrapper preview="We received a request to reset your password. Please click the button below to proceed with resetting your password.">
			<Heading>Reset your password</Heading>
			<Text>
				We received a request to reset your password. Please click the button
				below to proceed with resetting your password.
			</Text>
			<Button href={url} target="_blank" rel="noopener noreferrer">
				Reset Password
			</Button>
			<Footer expiresIn="1 hour" />
		</Wrapper>
	);
};

ResetPasswordTemplate.PreviewProps = baseEmailMock;

export default ResetPasswordTemplate;
