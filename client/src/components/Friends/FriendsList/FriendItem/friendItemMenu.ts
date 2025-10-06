export interface FriendItemMenu {
	label: string;
	onClick: (id: string) => void;
}

export const FRIEND_ITEM_MENU: FriendItemMenu[] = [
	{
		label: 'Unfriend',
		onClick: (id: string) => {
			console.log('unfriend', id);
		},
	},
	{
		label: 'Block',
		onClick: (id: string) => {
			console.log('block', id);
		},
	},
	{
		label: 'Report',
		onClick: (id: string) => {
			console.log('report', id);
		},
	},
];
