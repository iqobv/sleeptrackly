import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
	return new DocumentBuilder()
		.setTitle('Sleep Tracker API')
		.setDescription('Sleep Tracker API description')
		.setVersion('1.0.0')
		.addCookieAuth('session')
		.build();
};
