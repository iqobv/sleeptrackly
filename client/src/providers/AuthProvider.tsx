'use client';

import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys.constants';
import { useUserStore } from '@/store/useUser.store';
import { User } from '@/types/user/user.types';
import { PropsWithChildren, useEffect } from 'react';

interface MainProviderProps {
	user: User | null;
}

export const AuthProvider = ({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) => {
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		setUser(user);
		if (user) {
			localStorage.removeItem(LOCAL_STORAGE_KEYS.auth.registrationEmail);
		}
	}, [user, setUser]);

	return <>{children}</>;
};
