'use client';

import { terminateAllSessions, terminateSession } from '@/api/auth/session.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Session } from '@/types/auth/session.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSettingsSessionsItem = (
	session: Session,
	disableAllButton?: boolean,
) => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEYS.sessions.list();

	const { mutate: terminate, isPending: isTerminating } = useMutation({
		mutationFn: () => terminateSession(session.id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey });
			toast.success(data.message || 'Session terminated');
		},
	});

	const { mutate: terminateAll, isPending: isTerminatingAll } = useMutation({
		mutationFn: terminateAllSessions,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey });
			toast.success(data.message || 'All other sessions terminated');
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
