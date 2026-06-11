import { ImageProcessingOptions } from './image-processing-options.interface';

export interface UploadImageParams {
	file: Express.Multer.File;
	folder: string;
	oldUrl?: string | null;
	placeholderUrl?: string;
	options?: ImageProcessingOptions;
}
