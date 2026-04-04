import { IFriend, IFriendsResponse, TFriendStatus } from '@/types';
import { fetcher } from '@/utils';

export const sendFriendRequest = async (id: string) =>
	await fetcher<IFriend>(`/v1/friends/send`, {
		method: 'POST',
		body: JSON.stringify({ addresseeId: id }),
	});

export const getAllFriends = async () =>
	await fetcher<IFriendsResponse>(`/v1/friends/all`);

export const getPendingFriendRequests = async () =>
	await fetcher<IFriend[]>(`/v1/friends/pendings`);

export const changeRequestStatus = async (id: string, status: TFriendStatus) =>
	await fetcher<IFriend>(`/v1/friends/id/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ status }),
	});

export const updateManyPendingRequests = async (status: TFriendStatus) =>
	await fetcher<IFriend[]>(`/v1/friends/pendings`, {
		method: 'PATCH',
		body: JSON.stringify({ status }),
	});

export const deleteFriend = async (id: string) =>
	await fetcher<IFriend>(`/v1/friends/${id}`, { method: 'DELETE' });
