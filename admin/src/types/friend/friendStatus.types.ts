import { FRIEND_STATUS } from '@/constants';

export type TFriendStatus = (typeof FRIEND_STATUS)[keyof typeof FRIEND_STATUS];
