import { addFriendSchema } from '@/schemas/friend/addFriend.schema';
import { z } from 'zod';

export type AddFriendDto = z.infer<typeof addFriendSchema>;
