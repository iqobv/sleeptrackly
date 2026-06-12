'use client';

import { parseAsString, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const QueryMessageHandler = () => {
	const [{ error, success }, setMessages] = useQueryStates({
		error: parseAsString,
		success: parseAsString,
	});

	useEffect(() => {
		if (error || success) {
			if (error) {
				toast.error(error);
			}

			if (success) {
				toast.success(success);
			}

			setMessages({ error: null, success: null });
		}
	}, [error, success, setMessages]);

	return null;
};
