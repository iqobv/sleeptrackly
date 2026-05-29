import { createMessageDomain } from '@libs/utils';
import { AUTH_SUCCESS_MESSAGES } from './success-messages/auth.constants';
import { PASSWORD_RECOVERY_SUCCESS_MESSAGES } from './success-messages/password-recovery.constants';

export const SUCCESS_MESSAGES = {
	AUTH: createMessageDomain(AUTH_SUCCESS_MESSAGES),
	PASSWORD_RECOVERY: createMessageDomain(PASSWORD_RECOVERY_SUCCESS_MESSAGES),
} as const;
