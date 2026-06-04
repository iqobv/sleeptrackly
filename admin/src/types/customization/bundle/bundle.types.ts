import { getBundleById } from '@/api';

export type Bundle = Awaited<ReturnType<typeof getBundleById>>;
export type ItemInBundle = Bundle['items'][number];
