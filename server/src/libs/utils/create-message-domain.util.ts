import { MessageResponseDto } from '@libs/dto/message-response.dto';
import { MessageDomain } from '@libs/types';

export const createMessageDomain = <
	T extends Record<string, string>,
	P extends string = '',
>(
	messages: T,
	prefix?: P,
): MessageDomain<T, P> => {
	const domain = {} as Record<string, unknown>;
	const hasPrefix = prefix && prefix !== '';

	for (const key in messages) {
		if (Object.prototype.hasOwnProperty.call(messages, key)) {
			const generatedCode = hasPrefix ? `${prefix}_${key}` : key;

			domain[key] = new MessageResponseDto({
				code: generatedCode,
				message: messages[key],
			});
		}
	}

	return domain as unknown as MessageDomain<T, P>;
};
