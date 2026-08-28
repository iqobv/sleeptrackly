/* eslint-disable no-undef */

importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
);

self.addEventListener('install', () => {
	self.skipWaiting();
});

const params = new URL(location).searchParams;

firebase.initializeApp({
	apiKey: params.get('apiKey'),
	authDomain: params.get('authDomain'),
	projectId: params.get('projectId'),
	storageBucket: params.get('storageBucket'),
	messagingSenderId: params.get('messagingSenderId'),
	appId: params.get('appId'),
	measurementId: params.get('measurementId'),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	const { title, body, url } = payload.data || {};

	const notificationTitle = title || 'Sleeptrackly';

	self.registration.showNotification(notificationTitle, {
		body: body || '',
		data: { url: url || '/' },
	});
});

self.addEventListener('notificationclick', (e) => {
	e.notification.close();
	const targetUrl = e.notification.data?.url || '/';
	e.waitUntil(
		(async () => {
			const allClients = await self.clients.matchAll({
				type: 'window',
				includeUncontrolled: true,
			});
			for (const client of allClients) {
				if (client.url === new URL(targetUrl, self.location.origin).href) {
					await client.focus();
					return;
				}
			}
			await self.clients.openWindow(targetUrl);
		})(),
	);
});
