import { FriendStatus } from '@/types/friend/friendStatus.types';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type SendFriendRequestResponse =
	paths['/v1/friends/send']['post']['responses']['201']['content']['application/json'];
type GetAllFriendsResponse =
	paths['/v1/friends/all']['get']['responses']['200']['content']['application/json'];
type GetPendingFriendRequestsResponse =
	paths['/v1/friends/pendings']['get']['responses']['200']['content']['application/json'];
type ChangeRequestStatusResponse =
	paths['/v1/friends/id/{id}']['patch']['responses']['200']['content']['application/json'];
type UpdateManyPendingRequestsResponse =
	paths['/v1/friends/pendings']['patch']['responses']['200']['content']['application/json'];
type DeleteFriendResponse =
	paths['/v1/friends/{id}']['delete']['responses']['200']['content']['application/json'];

export const sendFriendRequest = async (id: string) =>
	(
		await apiClient.post<SendFriendRequestResponse>(`/v1/friends/send`, {
			addresseeId: id,
		})
	).data;

export const getAllFriends = async () =>
	(await apiClient.get<GetAllFriendsResponse>(`/v1/friends/all`)).data;

export const getPendingFriendRequests = async () =>
	(
		await apiClient.get<GetPendingFriendRequestsResponse>(
			`/v1/friends/pendings`,
		)
	).data;

export const changeRequestStatus = async (id: string, status: FriendStatus) =>
	(
		await apiClient.patch<ChangeRequestStatusResponse>(`/v1/friends/id/${id}`, {
			status,
		})
	).data;

export const updateManyPendingRequests = async (status: FriendStatus) =>
	(
		await apiClient.patch<UpdateManyPendingRequestsResponse>(
			`/v1/friends/pendings`,
			{
				status,
			},
		)
	).data;

export const deleteFriend = async (id: string) =>
	(await apiClient.delete<DeleteFriendResponse>(`/v1/friends/${id}`)).data;
