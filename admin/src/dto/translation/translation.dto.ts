import { translationSchema } from '@/schemas/translation/translation.schema';
import z from 'zod';

export type TranslationDto = z.infer<typeof translationSchema>;
