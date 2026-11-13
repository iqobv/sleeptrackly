import { UserSanctionType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserSanctionEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() reportId: string | null;
	@Expose() createdById: string;
	@Expose() startsAt: Date;
	@Expose() endsAt: Date | null;

	@Expose()
	@ApiProperty({ enum: UserSanctionType, enumName: 'UserSanctionType' })
	type: UserSanctionType;
}
