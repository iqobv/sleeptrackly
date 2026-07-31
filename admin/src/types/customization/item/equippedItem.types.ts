import { Profile } from '@shared/types';

export type EquippedItems = Profile['equippedItems'][number];
export type EquippedItem = EquippedItems['item'];
