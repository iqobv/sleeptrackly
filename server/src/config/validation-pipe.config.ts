import { ValidationPipe } from '@nestjs/common';

export const getValidationPipeConfig = () =>
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	});
