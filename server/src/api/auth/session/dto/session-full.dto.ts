import { ApiProperty } from '@nestjs/swagger';
import { SessionDto } from './session.dto';

export class SessionFullDto extends SessionDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	sessionId: string;
}
