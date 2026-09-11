import { TransformArray } from '@libs/decorators/transform-array.decorator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CreateBundleDto } from './create-bundle.dto';

export class UpdateBundleDto extends PartialType(CreateBundleDto) {
	@TransformArray()
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	itemsIds?: string[];
}

export class UpdateBundleSwaggerDto extends PartialType(UpdateBundleDto) {
	@ApiProperty({ type: 'string', format: 'binary', required: false })
	file: Express.Multer.File;
}
