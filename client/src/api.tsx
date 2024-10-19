const vapidPublicKey = "BLfq3iDTKDQYMeUpFjz2vTjsqWekSHkCB4Fzv5EKKzXcxPDP7rH8SOdn7DqIyEujKey-SpOXwYGWmSv_XFjb9Og"

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function sendPushNotification(){

    console.log("Before Register!");
    const register = await navigator.serviceWorker.register('/ServiceWorker.js', {})
    console.log("Service Worker Registered!");


    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);


    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
    .catch(err => {
        console.error('Error in subscription:', err);
    });

    console.log("Push Manager subscription with success: ", subscription);


    const response = await fetch('https://localhost:3000/api/send-notification',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subscription,
            url: 'https://localhost:5173'
        }),
    });

    if(!response.ok){
        throw new Error("Error fetch send-notification");
    }
    console.log("Push sent"); 
}