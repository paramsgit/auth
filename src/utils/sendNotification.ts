const { getMessaging } = require('./firebaseAdmin');
const messaging = getMessaging();

interface dataType {
    title: string;
    body: string | number;
}

export function sendNotification(subscription: string, data?: dataType) {
    const message = {
        notification: {
            title: data?.title,
            body: data?.body
        },
        token: subscription
    };
    
    if (!messaging.app) {
        getMessaging();
    }
    
    messaging.send(message)
        .then((response: any) => {
            console.log("Sent message", response);
        })
        .catch((error: any) => {
            console.log("Failed to send", error);
        });
}