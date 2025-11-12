export const ensureSw = async (): Promise<ServiceWorkerRegistration | null> => {
	if (typeof window === 'undefined' || !('serviceWorker' in navigator))
		return null;

	const reg =
		(await navigator.serviceWorker.getRegistration()) ??
		(await navigator.serviceWorker.register('/firebase-messaging-sw.js'));
	if (reg.active) return reg;

	await navigator.serviceWorker.ready;

	return (await navigator.serviceWorker.getRegistration()) ?? reg;
};
