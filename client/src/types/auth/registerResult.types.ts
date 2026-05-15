import { MessageApiResponse } from '../api/messageApiResponse.types';

export interface RegisterResult extends MessageApiResponse {
	email: string;
}
