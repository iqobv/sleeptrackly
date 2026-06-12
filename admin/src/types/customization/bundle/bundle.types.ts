import { getBundleById } from '@/api/customization/bundle/getBundleById.api';

export type Bundle = Awaited<ReturnType<typeof getBundleById>>;
export type ItemInBundle = Bundle['items'][number];
