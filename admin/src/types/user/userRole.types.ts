import { USER_ROLES } from '@/constants';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
