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
						return reject(error as Error);
					}
				})
				.end(file.buffer);
		});
	}

	async deleteFile(
		publicId: string,
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		const result = (await v2.uploader.destroy(publicId)) as
			| UploadApiResponse
			| UploadApiErrorResponse;
		return result;
	}
	async getImageByPublicId(
		publicId: string,
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		const result = (await v2.api.resource(publicId)) as
			| UploadApiResponse
			| UploadApiErrorResponse;
		return result;
	}
}
