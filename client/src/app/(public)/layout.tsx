import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
	return <div id="app">{children}</div>;
}
