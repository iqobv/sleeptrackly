import { R2Service } from '@infra/r2/r2.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { UploadImageParams } from './interfaces/upload-image-params.interface';
import type { UploadImage } from './interfaces/upload-image.interface';

@Injectable()
export class ImageService {
	private readonly logger = new Logger(ImageService.name);

	constructor(private readonly r2Service: R2Service) {}

	public async uploadImage(params: UploadImageParams): Promise<UploadImage> {
		const { file, folder, oldUrl = null, options, placeholderUrl } = params;

		const isVideo = file.mimetype.startsWith('video/');
		let processedBuffer: Buffer = file.buffer;
		let contentType: string = file.mimetype;
		let extension: string = file.originalname.split('.').pop() || '';

		if (!isVideo) {
			try {
				let pipeline = sharp(file.buffer, { animated: true });

				if (options?.width || options?.height) {
					pipeline = pipeline.resize(options.width, options.height, {
						fit: options.fit || 'cover',
					});
				}

				const quality = options?.quality || 80;

				processedBuffer = await pipeline
					.webp({ quality, effort: 6, lossless: false })
					.toBuffer();

				contentType = 'image/webp';
				extension = 'webp';
			} catch (e) {
				this.logger.error('Image processing failed', e);
				throw new BadRequestException(ERROR_MESSAGES.IMAGE.PROCESSING_FAILED);
			}
		}

		if (oldUrl && oldUrl !== placeholderUrl) {
			await this.deleteImage(oldUrl);
		}

		const filename = `${uuidv4()}.${extension}`;
		const key = `${folder}/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			contentType,
		);

		return {
			url: uploadResult.key,
			isAnimated: isVideo,
			extension,
		};
	}

	public async deleteImage(url: string): Promise<void> {
		try {
			await this.r2Service.delete(url);
		} catch (e) {
			this.logger.error(`Delete file error for url ${url}:`, e);
		}
	}
}
