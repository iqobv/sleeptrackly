import { ApiProperty } from '@nestjs/swagger';

export class DefaultFieldsDto {
	@ApiProperty({ example: '00478b8d-b42d-4570-82c8-6f0828e7ec21' })
	id: string;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
