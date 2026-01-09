import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
	@ApiProperty({
		description: 'Discounted price of the item',
		example: 1100,
		required: false,
	})
	@IsNumber()
	@Min(0)
	@IsOptional()
	discountedPrice?: number;
}
