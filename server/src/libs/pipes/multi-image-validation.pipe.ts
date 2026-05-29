import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

type MulterFileFields = Record<string, Express.Multer.File[]>;
type MulterFileList = Express.Multer.File[];

@Injectable()
export class MultiImageValidationPipe implements PipeTransform {
	constructor(private readonly maxSizeMb: number = 5) {}

	transform(files: MulterFileFields | MulterFileList | undefined) {
		if (!files) return files;

		const maxSizeBytes = this.maxSizeMb * 1024 * 1024;
		const allowedMimeTypes = [
			'image/png',
			'image/jpeg',
			'image/jpg',
			'image/gif',
			'image/webp',
		];

		const validateFile = (file: Express.Multer.File) => {
			if (file.size > maxSizeBytes) {
				throw new BadRequestException(
					`File ${file.originalname} exceeds the maximum size of ${this.maxSizeMb} MB`,
				);
			}
			if (!allowedMimeTypes.includes(file.mimetype)) {
				throw new BadRequestException(
					`File ${file.originalname} has an invalid type. Allowed types: ${allowedMimeTypes.join(
						', ',
					)}`,
				);
			}
		};

		if (Array.isArray(files)) {
			files.forEach(validateFile);
		} else if (typeof files === 'object') {
			const keys = Object.keys(files);

			keys.forEach((key) => {
				const fileArray = files[key];

				if (Array.isArray(fileArray)) {
					fileArray.forEach(validateFile);
				}
			});
		}

		return files;
	}
}
