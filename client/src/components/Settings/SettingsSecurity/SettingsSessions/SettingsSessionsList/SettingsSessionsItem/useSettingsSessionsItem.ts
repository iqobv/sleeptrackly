'use client';

import { terminateAllSessions, terminateSession } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { ISession } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSettingsSessionsItem = (
	session: ISession,
	disableAllButton?: boolean,
) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const queryKey = QUERY_KEYS.auth.sessions(user?.id || '');

	const { mutate: terminate, isPending: isTerminating } = useMutation({
		mutationFn: () => terminateSession(session.id),
		mutationKey: QUERY_KEYS.auth.terminateSession(user?.id || '', session.id),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey });
			toast.success('Session terminated');
		},
	});

	const { mutate: terminateAll, isPending: isTerminatingAll } = useMutation({
		mutationFn: terminateAllSessions,
		mutationKey: QUERY_KEYS.auth.terminateAllSession(user?.id || ''),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey,
			});
			toast.success('All other sessions terminated');
		},
	});

	const handleTerminateAll = () => {
		if (!disableAllButton) terminateAll();
	};

	const handleTerminate = () => terminate();

	return {
		isTerminating,
		isTerminatingAll,
		handleTerminate,
		handleTerminateAll,
	};
};
