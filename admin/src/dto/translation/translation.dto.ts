import { translationSchema } from '@/schemas';
import z from 'zod';

export type TranslationDto = z.infer<typeof translationSchema>;
