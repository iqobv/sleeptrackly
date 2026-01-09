import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import { CreateItemDto } from '../../dto';

export class CreateBundleDto extends OmitType(CreateItemDto, [
	'isExclusive',
	'type',
] as const) {
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
