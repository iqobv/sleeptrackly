import { CreateChallengeTemplateDto } from '@/dto/challenge/challengeTemplate.dto';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { Field } from '@/types/ui/field.types';
import { createPrefixBuilder } from '@/utils/prefixBuilder.util';

export const CHALLENGE_TEMPLATE_FIELDS = (
	isCreate: boolean = true,
	prefix: string = '',
): Field<CreateChallengeTemplateDto>[] => {
	const { p } = createPrefixBuilder<CreateChallengeTemplateDto>(prefix);

	return [
		{
			name: p('isActive'),
			label: 'Is Active',
			type: 'checkbox',
			placeholder: 'Is Active',
			required: isCreate,
		},
		{
			name: p('tier'),
			label: 'Tier',
			type: 'select',
			placeholder: 'Select Tier',
			required: isCreate,
			options: Object.values(ChallengeTier).map((tier) => ({
				label: tier,
				value: tier,
				isDefault: false,
				isDisabled: false,
			})),
		},
	];
};
