import admin from "firebase-admin"
import express from "express"

const app = express()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../keys/notification-demo-app-2600c-4366bb686814.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-demo-app-2600c.firebaseio.com"
})

const deviceToken =
    "cX4kwZOSTMymJvANzj4KSa:APA91bEVg18PdxiqV6x6p8iHGvXtOw-L-0Rx6XL1ShLSCRDCwy-RjM5vs2RAQZHVHZPndkza0YPNFrc0j7CxdC_IA29uCe0MskEGXnC82E0hSGcZo-_729EhMlT4G6gUhfJ2H6eirSJv"

// See docs for info on "notification" type message - https://firebase.google.com/docs/cloud-messaging/concept-options#notifications
app.get("/FCMTestNotificationMessage", (req, res) => {
    admin.messaging().send({
        token: deviceToken,
        notification: {
            title: "FCM direct notification",
            body:
                // eslint-disable-next-line max-len
                "2 Notifications, one with and one without logo, will arrive. Clicking these notifications does not run NotificationResponseRecievedListner SDK30.0.9"
        }
    })

    res.send("done")
})

// See docs for info on "data" type messages - https://firebase.google.com/docs/cloud-messaging/concept-options#data_messages
app.get("/FCMTestDataMessage", (req, res) => {
    admin.messaging().send({
        token: deviceToken,
        data: {
            experienceId: "@jamies1211/notification-demo-app", // This is required for Expo to process the notification
            /*
             * You can also add Expo specific keys to customize the message, or
             * arbitrary data keys
             *
             * Expo supported keys (17/8/20) - https://github.com/expo/expo/blob/faec32dd55b4aa17b4c3d8e31717f2ef27860f90/packages/expo-notifications/android/src/main/java/expo/modules/notifications/notifications/JSONNotificationContentBuilder.java#L17-L28
             *
             * private static final String TITLE_KEY = "title";
             * private static final String TEXT_KEY = "message";
             * private static final String SUBTITLE_KEY = "subtitle";
             * private static final String SOUND_KEY = "sound";
             * private static final String BODY_KEY = "body";
             * private static final String VIBRATE_KEY = "vibrate";
             * private static final String PRIORITY_KEY = "priority";
             * private static final String BADGE_KEY = "badge";
             * private static final String COLOR_KEY = "color";
             * private static final String AUTO_DISMISS_KEY = "autoDismiss";
             * private static final String CATEGORY_IDENTIFIER_KEY = "categoryId";
             * private static final String STICKY_KEY = "sticky";
             *
             */
            otherKey: "value"
        }
    })

    res.send("done")
})

module.exports = app
