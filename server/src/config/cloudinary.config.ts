import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = (configService: ConfigService) =>
	cloudinary.config({
		cloud_name: configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
		api_key: configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
		api_secret: configService.getOrThrow<string>('CLOUDINARY_API_SECRET'),
	});
