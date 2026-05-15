'use client';

import { LOCAL_STORAGE_KEYS } from '@/constants';
import { useUserStore } from '@/store';
import { User } from '@/types';
import { PropsWithChildren, useEffect } from 'react';

interface MainProviderProps {
	user: User | null;
}

export default function AuthProvider({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) {
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		setUser(user);
		if (user) {
			localStorage.removeItem(LOCAL_STORAGE_KEYS.auth.registrationEmail);
		}
	}, [user, setUser]);

	return <>{children}</>;
}
