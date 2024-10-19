// import { useEffect} from 'react';
import { sendPushNotification } from './api'; 

const NotificationPage = () => {
    // useEffect(() => {
    //     if ("serviceWorker" in navigator) {
    //         sendPushNotification().catch(err => console.error(err));
    //     }
    // }, []);

    const testClick = () => {
        setTimeout(() => {
            sendPushNotification().catch(err => console.error(err));
        }, 10000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 className="text-2xl font-bold mb-4">Proba push notification</h1>
            <button onClick={testClick} className="px-4 py-2 bg-blue-500 text-white rounded">
                Get message as notif
            </button>
        </div>
        
    );
};

export default NotificationPage;