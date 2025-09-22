import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationDto {
	@ApiProperty({ example: 'a81bc81bdead4e5dabff90865d1e13b1' })
	@IsString({ message: 'Token is required' })
	@IsNotEmpty({ message: 'Token is required' })
	token: string;
}
