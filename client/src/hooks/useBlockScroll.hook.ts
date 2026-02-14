'use client';

import { useEffect } from 'react';

export const useBlockScroll = (blocked: boolean) => {
	useEffect(() => {
		document.body.style.overflow = blocked ? 'hidden' : 'unset';
	}, [blocked]);
};
