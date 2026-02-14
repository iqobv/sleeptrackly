import { ACQUIRED_FROM } from '@/constants';

export type TAcquiredFrom = (typeof ACQUIRED_FROM)[keyof typeof ACQUIRED_FROM];
