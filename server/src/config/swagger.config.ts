import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
	return new DocumentBuilder()
		.setTitle('Sleeptrackly API')
		.setDescription('Sleeptrackly API description')
		.setVersion('1.5.3')
		.addCookieAuth('accessToken', {
			type: 'apiKey',
			in: 'cookie',
		})
		.build();
};
