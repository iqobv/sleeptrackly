import { Injectable } from '@nestjs/common';
import {
	UploadApiErrorResponse,
	UploadApiOptions,
	UploadApiResponse,
	v2,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
	async uploadFile(
		file: Express.Multer.File,
		options?: UploadApiOptions,
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			v2.uploader
				.upload_stream(options, (error, result) => {
					if (result) {
						return resolve(result);
					} else {
						return reject(error);
					}
				})
				.end(file.buffer);
		});
	}

	async deleteFile(publicId: string) {
		return await v2.uploader.destroy(publicId);
	}

	async getImageByPublicId(publicId: string): Promise<UploadApiResponse> {
		return await v2.api.resource(publicId);
	}
}
