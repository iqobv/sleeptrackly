import {
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
} from '@nestjs/common';

export const ImageValidationPipe = (
	maxSizeMb: number = 5,
	fileIsRequired: boolean = true,
): ParseFilePipe =>
	new ParseFilePipe({
		fileIsRequired,
		validators: [
			new MaxFileSizeValidator({
				maxSize: 1024 * 1024 * maxSizeMb,
				message: `File size should not exceed ${maxSizeMb} MB`,
			}),
			new FileTypeValidator({
				fileType: 'image/(png|jpeg|jpg|gif|webp)',
			}),
		],
	});
