import { ACQUIRED_FROM } from '@/constants';

export type AcquiredFrom = (typeof ACQUIRED_FROM)[keyof typeof ACQUIRED_FROM];
