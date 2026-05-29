import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageResponseDto {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Operation message' })
	message: string;

	@ApiProperty({ example: 'CODE' })
	code: string;

	@ApiPropertyOptional({ example: 'fieldName' })
	field?: string;

	@ApiPropertyOptional({ type: 'object', additionalProperties: true })
	meta?: Record<string, unknown>;
}
