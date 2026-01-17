import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { CreateItemDto } from '../../dto';

export class CreateBundleDto extends OmitType(CreateItemDto, [
	'rarity',
	'type',
	'basePrice',
] as const) {
	@IsNumber({ allowInfinity: false, allowNaN: false })
	@Min(0)
	@Max(100)
	discountPercentage: number;

	@ApiProperty({
		description: 'Array of item IDs to be included in the bundle',
		type: [String],
		example: [
			'550e8400-e29b-41d4-a716-446655440000',
			'550e8400-e29b-41d4-a716-446655440001',
		],
	})
	@IsArray()
	@IsUUID('4', { each: true })
	itemsIds: string[];
}
