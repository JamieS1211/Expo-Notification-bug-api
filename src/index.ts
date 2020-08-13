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
    // eslint-disable-next-line max-len
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
            key: "Value"
        }
    })

    res.send("done")
})

module.exports = app
