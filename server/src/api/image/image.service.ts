import { R2Service } from '@infra/r2/r2.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { UploadImage } from './interfaces';

@Injectable()
export class ImageService {
	constructor(private readonly r2Service: R2Service) {}

	public async uploadImage(
		file: Express.Multer.File,
		folder: string,
		oldUrl?: string | null,
		placeholderUrl?: string,
	): Promise<UploadImage> {
		const isVideo = file.mimetype.startsWith('video/');
		let processedBuffer: Buffer = file.buffer;
		let contentType: string = file.mimetype;
		let extension: string = file.originalname.split('.').pop() || '';

		if (!isVideo) {
			try {
				const pipeline = sharp(file.buffer, { animated: true });

				processedBuffer = await pipeline
					.webp({ quality: 80, effort: 6, lossless: false })
					.toBuffer();
				contentType = 'image/webp';
				extension = 'webp';
			} catch (error) {
				console.error('Sharp error:', error);
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
			console.error('Delete file error:', e);
		}
	}
}
