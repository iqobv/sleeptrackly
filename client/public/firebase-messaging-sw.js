importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
	apiKey: 'AIzaSyBBG7HyB2c3AHDb-my3Ix-rMR0KwZsVCsU',
	authDomain: 'sleeptrackly.firebaseapp.com',
	projectId: 'sleeptrackly',
	storageBucket: 'sleeptrackly.firebasestorage.app',
	messagingSenderId: '567224368591',
	appId: '1:567224368591:web:79db3442de95cb933026ba',
	measurementId: 'G-JDKRG6XN5C',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	const { title, body, url } = payload.notification || {};
	self.registration.showNotification(title || 'Notification', {
		body,
		data: { url: payload.data?.url || url || '/' },
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
				if (
					client.url.includes(new URL(targetUrl, self.location.origin).pathname)
				) {
					client.focus();
					return;
				}
			}
			await self.clients.openWindow(targetUrl);
		})()
	);
});
