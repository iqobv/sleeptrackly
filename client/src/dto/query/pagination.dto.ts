import { languageQuerySchema } from '@/schemas/query/language.schema';
import { paginationSchema } from '@/schemas/query/pagination.schema';
import { paginationWithLanguageSchema } from '@/schemas/query/paginationWithLanguage.schema';
import { z } from 'zod';

export type PaginationDto = z.infer<typeof paginationSchema>;
export type LanguageDto = z.infer<typeof languageQuerySchema>;
export type PaginationWithLanguageDto = z.infer<
	typeof paginationWithLanguageSchema
>;
