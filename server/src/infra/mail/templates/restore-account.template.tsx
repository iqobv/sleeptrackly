import React from 'react';
import { Heading, Text } from 'react-email';
import { BaseEmailProps } from './base-email-props.types';
import Button from './components/button';
import Footer from './components/footer';
import Wrapper from './components/wrapper';
import { baseEmailMock } from './mocks';

const RestoreAccountTemplate = ({ url }: BaseEmailProps) => {
	return (
		<Wrapper preview="We received a request to restore your account. Please click the button below to proceed with restoring your account.">
			<Heading>Restore your account!</Heading>
			<Text>
				We received a request to restore your account. Please click the button
				below to proceed with restoring your account.
			</Text>
			<Button href={url} target="_blank" rel="noopener noreferrer">
				Restore Account
			</Button>
			<Footer expiresIn="1 hour" />
		</Wrapper>
	);
};

RestoreAccountTemplate.PreviewProps = baseEmailMock;

export default RestoreAccountTemplate;
