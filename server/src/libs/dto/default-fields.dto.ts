import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DefaultFieldsDto {
	/**
	 * @example '123e4567-e89b-12d3-a456-426614174000'
	 */
	@Expose() id: string;
	@Expose() createdAt: Date;
	@Expose() updatedAt: Date;
}
