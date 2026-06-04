import { Profile } from '@/types/profile';

export type EquippedItems = Profile['equippedItems'][number];
export type EquippedItem = EquippedItems['item'];
