'use client';

import { useUserStore } from '@/store';
import { IUser } from '@/types';
import { PropsWithChildren, useEffect } from 'react';

interface MainProviderProps {
	user: IUser | null;
}

export default function AuthProvider({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) {
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		setUser(user);
	}, [user, setUser]);

	return <>{children}</>;
}
