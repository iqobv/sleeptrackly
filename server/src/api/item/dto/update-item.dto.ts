import { PartialType } from '@nestjs/swagger';
import { CreateItemDto, CreateItemSwaggerDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}

export class UpdateItemDtoSwaggerDto extends PartialType(
	CreateItemSwaggerDto,
) {}
