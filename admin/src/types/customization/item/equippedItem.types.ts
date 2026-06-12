import { Profile } from '@/types/profile/profile.types';

export type EquippedItems = Profile['equippedItems'][number];
export type EquippedItem = EquippedItems['item'];
