import { ValidationPipe } from '@nestjs/common';

export const getValidationPipeConfig = (): ValidationPipe =>
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	});
