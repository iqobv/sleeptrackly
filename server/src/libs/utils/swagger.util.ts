import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/config';

export const setupSwagger = (app: INestApplication) => {
	const config = getSwaggerConfig();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, documentFactory, {
		customSiteTitle: 'Sleep Tracker API',
		jsonDocumentUrl: '/docs/json',
		yamlDocumentUrl: '/docs/yaml',
	});
};
