import { z } from 'zod';
import { createChallengeTemplateSchema } from './createChallengeTemplate.schema';

export const bulkCreateChallengeTemplatesSchema = z.object({
	templates: z.array(createChallengeTemplateSchema),
});
