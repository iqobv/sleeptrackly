import { IMessageApiResponse } from '../api/messageApiResponse.types';

export interface IRegisterResult extends IMessageApiResponse {
	email: string;
}
