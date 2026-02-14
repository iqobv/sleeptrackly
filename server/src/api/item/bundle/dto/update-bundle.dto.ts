import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CreateBundleDto } from './create-bundle.dto';

export class UpdateBundleDto extends PartialType(CreateBundleDto) {
	@Transform(({ value }: { value: unknown }) => {
		if (typeof value === 'string') {
			const parsed: string[] = JSON.parse(value) as unknown as string[];

			if (Array.isArray(parsed)) {
				return parsed.map((id: string) => id.trim());
			}

			return undefined;
		}

		return value;
	})
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	itemsIds?: string[];
}

export class UpdateBundleSwaggerDto extends PartialType(UpdateBundleDto) {
	@ApiProperty({ type: 'string', format: 'binary', required: false })
	file: Express.Multer.File;
}
