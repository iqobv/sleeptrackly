import { TransformArray } from '@libs/decorators';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { CreateItemDto } from '../../dto';

export class CreateBundleDto extends OmitType(CreateItemDto, [
	'rarity',
	'type',
	'basePrice',
] as const) {
	@ApiProperty({
		description: 'Discount percentage for the bundle (0-100)',
		example: 20,
	})
	@Type(() => Number)
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
	@TransformArray()
	@IsArray()
	@IsUUID('4', { each: true })
	itemsIds: string[];
}

export class CreateBundleSwaggerDto extends CreateBundleDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	file: Express.Multer.File;
}
