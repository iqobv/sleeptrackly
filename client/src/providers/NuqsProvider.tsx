'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { PropsWithChildren } from 'react';

export const NuqsProvider = ({ children }: PropsWithChildren<unknown>) => {
	return <NuqsAdapter>{children}</NuqsAdapter>;
};
