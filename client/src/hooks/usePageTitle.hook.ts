import { titleConfig } from '@/config/title.config';
import { useEffect } from 'react';

export const usePageTitle = (title?: string) => {
	useEffect(() => {
		if (!title) return;
		document.title = `${title} ${titleConfig.separator} ${titleConfig.name}`;
	}, [title]);
};
