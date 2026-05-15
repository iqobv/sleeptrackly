import { IFriend, IFriendsResponse, TFriendStatus } from '@/types';
import { apiClient } from '../axios';

export const sendFriendRequest = async (id: string) =>
	(await apiClient.post<IFriend>(`/v1/friends/send`, { addresseeId: id })).data;

export const getAllFriends = async () =>
	(await apiClient.get<IFriendsResponse>(`/v1/friends/all`)).data;

export const getPendingFriendRequests = async () =>
	(await apiClient.get<IFriend[]>(`/v1/friends/pendings`)).data;

export const changeRequestStatus = async (id: string, status: TFriendStatus) =>
	(await apiClient.patch<IFriend>(`/v1/friends/id/${id}`, { status })).data;

export const updateManyPendingRequests = async (status: TFriendStatus) =>
	(
		await apiClient.patch<IFriend[]>(`/v1/friends/pendings`, {
			status,
		})
	).data;

export const deleteFriend = async (id: string) =>
	(await apiClient.delete<IFriend>(`/v1/friends/${id}`)).data;
