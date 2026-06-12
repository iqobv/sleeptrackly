'use client';

import { searchByUsername } from '@/api/user/user.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddFriend = () => {
	const [search, setSearch] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);

	const { mutate, data, isPending } = useMutation({
		mutationFn: ({ username }: { username: string }) =>
			searchByUsername(username),
		mutationKey: QUERY_KEYS.friends.search(search),
	});

	const handleSearch = () => {
		if (search.trim().length >= 3) mutate({ username: search });
	};

	return {
		search,
		setSearch,
		onChange,
		handleSearch,
		data,
		isPending,
	};
};
