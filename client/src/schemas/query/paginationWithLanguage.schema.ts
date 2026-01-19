import { languageQuerySchema } from './language.schema';
import { paginationSchema } from './pagination.schema';

export const paginationWithLanguageSchema = paginationSchema.extend(
	languageQuerySchema.shape,
);
