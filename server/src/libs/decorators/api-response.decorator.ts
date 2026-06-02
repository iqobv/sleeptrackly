import { MessageDetail } from '@libs/types';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { MessageResponseDto } from '../dto/message-response.dto';

type HttpStatusKey = keyof typeof HttpStatus;
type HttpStatusValue = (typeof HttpStatus)[HttpStatusKey];
type StatusInput = HttpStatusValue | HttpStatusKey;

type MessageExample = {
	summary: string;
	description: string;
	value: {
		statusCode: number;
		code: string;
		message: string;
		field?: string;
		meta?: Record<string, unknown>;
	};
};

function createMessageDecorator(
	statusInput: StatusInput,
	messages: MessageDetail | MessageDetail[],
): MethodDecorator {
	const statusCode =
		typeof statusInput === 'number' ? statusInput : HttpStatus[statusInput];

	const messagesArray = Array.isArray(messages) ? messages : [messages];

	const examples = messagesArray.reduce<Record<string, MessageExample>>(
		(acc, item) => {
			acc[item.code] = {
				summary: item.code,
				description: item.message,
				value: {
					statusCode,
					code: item.code,
					message: item.message,
					field: 'field' in item ? item.field : undefined,
					meta: 'meta' in item ? item.meta : undefined,
				},
			};
			return acc;
		},
		{},
	);

	return applyDecorators(
		ApiExtraModels(MessageResponseDto),
		ApiResponse({
			status: statusCode,
			description: messagesArray.map((e) => e.message).join(' | '),
			content: {
				'application/json': {
					schema: {
						allOf: [
							{ $ref: getSchemaPath(MessageResponseDto) },
							{
								properties: {
									field: {
										type: 'string',
										description:
											'The name of the field that caused the validation error',
									},
									meta: {
										type: 'object',
										description:
											'Additional dynamic metadata for the response context',
									},
								},
							},
						],
					},
					examples,
				},
			},
		}),
	);
}

export function ApiSuccessResponse(
	statusCode: StatusInput,
	success: MessageDetail | MessageDetail[],
): MethodDecorator {
	return createMessageDecorator(statusCode, success);
}

export function ApiErrorResponse(
	statusCode: StatusInput,
	errors: MessageDetail | MessageDetail[],
): MethodDecorator {
	return createMessageDecorator(statusCode, errors);
}
