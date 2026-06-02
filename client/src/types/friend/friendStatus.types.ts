import { FRIEND_STATUS } from '@/constants';
import { components } from '../schema';

type SwaggerFriendStatus = components['schemas']['FullFriendDto']['status'];

export type FriendStatus = (typeof FRIEND_STATUS)[keyof typeof FRIEND_STATUS];
