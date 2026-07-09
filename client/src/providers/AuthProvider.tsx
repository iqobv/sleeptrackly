'use client';

import { syncTimezone } from '@/api/user/syncTimezone.api';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys.constants';
import { useUserStore } from '@/store/useUser.store';
import { User } from '@/types/user/user.types';
import { PropsWithChildren, useEffect, useRef } from 'react';

interface MainProviderProps {
	user: User | null;
}

export const AuthProvider = ({
	children,
	user,
}: PropsWithChildren<MainProviderProps>) => {
	const setUser = useUserStore((state) => state.setUser);
	const isTimezoneChecked = useRef(false);

	useEffect(() => {
		setUser(user);
		if (user) {
			localStorage.removeItem(LOCAL_STORAGE_KEYS.auth.registrationEmail);
		}
	}, [user, setUser]);

	useEffect(() => {
		if (!user || isTimezoneChecked.current) return;

		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		if (user.timezone !== timezone) {
			syncTimezone({ timezone })
				.then((data) => {
					if (data.timezone) {
						isTimezoneChecked.current = true;
					}
				})
				.catch(() => {});
		} else {
			isTimezoneChecked.current = true;
		}
	});

	return <>{children}</>;
};
