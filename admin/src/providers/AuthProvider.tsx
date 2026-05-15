'use client';

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
	}, [user, setUser]);

	return <>{children}</>;
}
