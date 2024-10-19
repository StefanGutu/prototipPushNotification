console.log("Service Worker Loaded!");

self.addEventListener('push', (event) => {
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


self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    notification.close();

    clients.openWindow('https://localhost:5173');
});

