const webpush = require('web-push');
const config = require('../../../config-password/paasword');

const VapidKeys = {
    publicKey: config.VapidKeys.publicKey,
    privateKey: config.VapidKeys.privateKey
}

webpush.setVapidDetails(
    'mailto:web-push-book@gauntface.com',
    VapidKeys.publicKey,
    VapidKeys.privateKey
);

async function IdeaNotification(subscriptions, data) {
        const option = {
            endpoint: subscriptions[0].endpoint,
            keys: {
                p256dh: subscriptions[0].p256dh,
                auth: subscriptions[0].auth
            }
        };
        const notificationPayload = {
            "notification": {
                "title":data.title,
                "body": data.body,
                "icon": "../src/assets/images/logo.png",
                "data": {
                    url:data.click_action,
                    "dateOfArrival": Date.now(),
                    "primaryKey": 1
                },
                "actions": [{
                    "action": "open_url",
                    "title": "Go to the site",
                    "openUrl": "http://127.0.0.1:6245/idea"
                }]
            }
        };

        
        resultwebPush = await webpush.sendNotification(option, JSON.stringify(notificationPayload));
        return resultwebPush;
}



module.exports = {
    IdeaNotification
}