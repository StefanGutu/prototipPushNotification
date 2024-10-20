console.log("Service Worker Loaded!");

self.addEventListener('push', (event: PushEvent) => {
    const data = event.data?.json();
    console.log('Push event received');

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "./icons/social-media.png",
        data: {
            url: data.url
        }
    });
});


self.addEventListener('notificationclick', (event: NotificationEvent) => {
    const notification = event.notification;
    notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                
                if (client.url.includes(notification.data.url) && 'focus' in client) { //Check if an old window exists and focus on it
                    return client.focus(); 
                }
            }

            if (clients.openWindow) { // if a window doesnt exist its open a new one
                return clients.openWindow(notification.data.url);
            }
        })
    );
});

