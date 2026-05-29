import { MessageDomain } from '@libs/types';

export const createMessageDomain = <T extends Record<string, string>>(
	messages: T,
): MessageDomain<T> => {
	const domain = {} as MessageDomain<T>;

	for (const key in messages) {
		if (Object.prototype.hasOwnProperty.call(messages, key)) {
			domain[key] = {
				code: key,
				message: messages[key],
			};
		}
	}

	return domain;
};
