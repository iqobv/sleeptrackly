import { USER_ROLES } from '@/constants';

export type TUserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
