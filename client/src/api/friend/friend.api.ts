import { Friend, FriendsResponse, FriendStatus } from '@/types';
import { apiClient } from '../axios';

export const sendFriendRequest = async (id: string) =>
	(await apiClient.post<Friend>(`/v1/friends/send`, { addresseeId: id })).data;

export const getAllFriends = async () =>
	(await apiClient.get<FriendsResponse>(`/v1/friends/all`)).data;

export const getPendingFriendRequests = async () =>
	(await apiClient.get<Friend[]>(`/v1/friends/pendings`)).data;

export const changeRequestStatus = async (id: string, status: FriendStatus) =>
	(await apiClient.patch<Friend>(`/v1/friends/id/${id}`, { status })).data;

export const updateManyPendingRequests = async (status: FriendStatus) =>
	(
		await apiClient.patch<Friend[]>(`/v1/friends/pendings`, {
			status,
		})
	).data;

export const deleteFriend = async (id: string) =>
	(await apiClient.delete<Friend>(`/v1/friends/${id}`)).data;
