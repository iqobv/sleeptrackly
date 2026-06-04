'use client';

import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownTrigger,
} from '@/components/UI';
import { Friend } from '@/types';
import { MdOutlineMoreVert } from 'react-icons/md';
import { FRIEND_ITEM_MENU } from './friendItemMenu';
import { FriendItemMenuButton } from './FriendItemMenuButton';

interface FriendItemMenuProps {
	friend: Friend;
}

export const FriendItemMenu = ({ friend }: FriendItemMenuProps) => {
	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button variant="text" isIcon isRounded>
					<MdOutlineMoreVert size={24} />
				</Button>
			</DropdownTrigger>
			<DropdownContent
				side="bottom"
				align="end"
				alignOffset={10}
				style={{ minWidth: '150px' }}
			>
				{FRIEND_ITEM_MENU.map((item) => (
					<FriendItemMenuButton key={item.label} item={item} friend={friend} />
				))}
			</DropdownContent>
		</Dropdown>
	);
};
