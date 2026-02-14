import {
	languageQuerySchema,
	paginationSchema,
	paginationWithLanguageSchema,
} from '@/schemas';
import z from 'zod';

export type PaginationDto = z.infer<typeof paginationSchema>;
export type LanguageDto = z.infer<typeof languageQuerySchema>;
export type PaginationWithLanguageDto = z.infer<
	typeof paginationWithLanguageSchema
>;
