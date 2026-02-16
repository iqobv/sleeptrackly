importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
);
importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
);

self.addEventListener('install', () => {
	self.skipWaiting();
});

firebase.initializeApp({
	apiKey: 'AIzaSyBBG7HyB2c3AHDb-my3Ix-rMR0KwZsVCsU',
	authDomain: 'sleeptrackly.firebaseapp.com',
	projectId: 'sleeptrackly',
	storageBucket: 'sleeptrackly.appspot.com',
	messagingSenderId: '567224368591',
	appId: '1:567224368591:web:79db3442de95cb933026ba',
	measurementId: 'G-JDKRG6XN5C',
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
