import express, { Request, Response } from 'express';
import cors from 'cors';
import webPush from 'web-push';
import https from 'https';
import fs from 'fs';
import path from 'path';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


const vapidPublicKey = "BLfq3iDTKDQYMeUpFjz2vTjsqWekSHkCB4Fzv5EKKzXcxPDP7rH8SOdn7DqIyEujKey-SpOXwYGWmSv_XFjb9Og"
const vapidPrivateKey = "D8fjdTVuY_RLZEtIxA0g13DZa_oHBnoKYiQqEmyaoyQ"

webPush.setVapidDetails(
    'https://localhost:5173',
    vapidPublicKey,
    vapidPrivateKey
);

app.post('/api/send-notification',(req, res) => {
    console.log("We are in /api/send-notification");

    const subscription = req.body.subscription;

    if (!subscription) {

        res.status(400).json({ error: 'Subscription is required' });
        
    }else {

        console.log("-------------------------------------------------------------------")
        console.log("Received subscription:", subscription);
        console.log("-------------------------------------------------------------------")
    
        const payload = JSON.stringify({
            title: 'Hi!',
            body: 'Test push notification',
            url: 'https://localhost:5173'
        });
        console.log("-------------------------------------------------------------------")
        console.log("Payload  made successful:", payload);
        console.log("-------------------------------------------------------------------")
    
    
        webPush.sendNotification(subscription,payload)
        .then(response => res.status(200).json({ success: true }))
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error });
        });

    }

});



const dirname = path.resolve();

const httpsOptions = {
    key: fs.readFileSync(path.join(dirname, 'ssl', 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(dirname, 'ssl', 'localhost.pem')),
};

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
});