import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { CreateBundleDto } from './create-bundle.dto';

export class UpdateBundleDto extends PartialType(CreateBundleDto) {
	@ApiProperty({
		description: 'Discounted price of the bundle',
		example: 1100,
		required: false,
	})
	@IsNumber()
	@Min(0)
	@IsOptional()
	discountedPrice?: number;
}
