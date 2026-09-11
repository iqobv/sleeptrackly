import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		const exceptionResponse = exception.getResponse() as Record<
			string,
			unknown
		>;

		const code =
			typeof exceptionResponse === 'object' &&
			exceptionResponse !== null &&
			'code' in exceptionResponse
				? (exceptionResponse.code as string)
				: 'INTERNAL_ERROR';

		const message =
			typeof exceptionResponse === 'object' &&
			exceptionResponse !== null &&
			'message' in exceptionResponse
				? (exceptionResponse.message as string | string[])
				: exception.message;

		const field =
			typeof exceptionResponse === 'object' &&
			exceptionResponse !== null &&
			'field' in exceptionResponse
				? (exceptionResponse.field as string)
				: undefined;

		const meta =
			typeof exceptionResponse === 'object' &&
			exceptionResponse !== null &&
			'meta' in exceptionResponse
				? (exceptionResponse.meta as Record<string, unknown>)
				: undefined;

		const errorBody = {
			statusCode: status,
			code,
			message,
			...(field && { field }),
			...(meta && { meta }),
		};

		response.status(status).json(errorBody);
	}
}
