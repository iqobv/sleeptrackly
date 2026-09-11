import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class CoinEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() amount: number;
}
