'use client';

import { searchByUsername } from '@/api/user/user.api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useAddFriend = () => {
	const [search, setSearch] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);

	const { mutate, data, isPending } = useMutation({
		mutationFn: ({ username }: { username: string }) =>
			searchByUsername(username),
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
