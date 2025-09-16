import { ValidationPipe } from '@nestjs/common';

export const getValidationPipeConfig = () =>
	new ValidationPipe({ transform: true });
