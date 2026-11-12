import * as React from 'react';
import { Heading, Text } from 'react-email';
import type { BaseEmailProps } from './base-email-props.types';
import Button from './components/button';
import Footer from './components/footer';
import Wrapper from './components/wrapper';
import { baseEmailMock } from './mocks';

const ConfirmationTemplate = ({ url }: BaseEmailProps) => {
	return (
		<Wrapper preview="Thank you for signing up! Please confirm your email address to activate your account.">
			<Heading className="mobile:text-2xl">Welcome to Sleeptrackly!</Heading>
			<Text>
				Please confirm your email address to activate your account and start
				tracking your sleep patterns. This helps us ensure the security of your
				data.
			</Text>
			<Button href={url} target="_blank" rel="noopener noreferrer">
				Confirm Email
			</Button>
			<Footer expiresIn="1 hour" />
		</Wrapper>
	);
};

ConfirmationTemplate.PreviewProps = baseEmailMock;

export default ConfirmationTemplate;
