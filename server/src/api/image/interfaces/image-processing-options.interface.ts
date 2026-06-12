import { FitEnum } from 'sharp';

export interface ImageProcessingOptions {
	width?: number;
	height?: number;
	quality?: number;
	fit?: keyof FitEnum;
}
