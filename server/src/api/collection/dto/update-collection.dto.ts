import { PartialType } from '@nestjs/swagger';
import {
	CreateCollectionDto,
	CreateCollectionSwaggerDto,
} from './create-collection.dto';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}

export class UpdateCollectionSwaggerDto extends PartialType(
	CreateCollectionSwaggerDto,
) {}
