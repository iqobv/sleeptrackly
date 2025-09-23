'use client';

import { useEmailConfirm } from '@/hooks';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';

const SettingsEmailConfirmation = () => {
	const { sendConfirmation } = useEmailConfirm();

	return (
		<SettingsSecurityField
			label="Your email is not confirmed. Please confirm your email to continue."
			action={sendConfirmation}
			buttonText="Activate"
		/>
	);
};

export default SettingsEmailConfirmation;
