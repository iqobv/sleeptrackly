import { FRIEND_STATUS } from '@/constants';

export type FriendStatus = (typeof FRIEND_STATUS)[keyof typeof FRIEND_STATUS];
