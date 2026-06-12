'use client';

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
	}, [user, setUser]);

	return <>{children}</>;
};
