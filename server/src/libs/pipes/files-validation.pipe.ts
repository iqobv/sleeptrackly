import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export interface FileValidationOptions {
	maxSizeMb: number;
	allowedTypes: string[];
}

@Injectable()
export class FilesValidationPipe<T extends object> implements PipeTransform {
	constructor(
		private readonly config: Record<keyof T, FileValidationOptions>,
	) {}

	transform(files: T | undefined): T | undefined {
		if (!files) return files;

		const configKeys = Object.keys(this.config) as Array<keyof T>;

		for (const fieldName of configKeys) {
			const fileOptions = this.config[fieldName];
			const fileArray = (
				files as Record<keyof T, Express.Multer.File[] | undefined>
			)[fieldName];

			if (fileArray && fileArray.length > 0) {
				for (const file of fileArray) {
					this.validateFile(file, String(fieldName), fileOptions);
				}
			}
		}

		return files;
	}

	private validateFile(
		file: Express.Multer.File,
		fieldName: string,
		options: FileValidationOptions,
	): void {
		const maxBytes = 1024 * 1024 * options.maxSizeMb;

		if (file.size > maxBytes) {
			throw new BadRequestException(
				`File in field [${fieldName}] is too large. Maximum allowed: ${options.maxSizeMb} MB`,
			);
		}

		if (!options.allowedTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				`Invalid file format in field [${fieldName}]. Allowed types: ${options.allowedTypes.join(', ')}`,
			);
		}
	}
}
