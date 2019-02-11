var apn = require('apn');
const serverless = require('serverless-http');
const express = require('express')
const app = express()

var options = {
  token: {
    key: "APNsAuthKey_YB84GPV2XK.p8",
    keyId: "YB84GPV2XK",
    teamId: "49QVWZXLWJ"
  },
  production: false
};

let payload = {
  "aps": {
    "alert": "A guest has checked in!",
    "category": "GuestCheckIn",
    "sound": "default",
  },
  "firstName": "Ben",
  "lastName": "Lee",
  "reasonForVisit": "Open an Account",
  "checkInTime": "1:35:00pm"
}

let deviceTokens = ["2ed919027ee050630f24045ef6a7a6bc07fd1ddb658674edc959499ff09205e6"]

var connection = new apn.Provider(options);

var notification = new apn.Notification();
notification.alert = "A guest has checked in!";
notification.payload = payload
notification.topic = "com.capitalone.APEXBuddy";

app.get('/', function (res, response) {
  connection.send(notification, deviceTokens).then( (apnResponse) => {
    console.log(apnResponse);
    response.send(apnResponse)
  })
})

module.exports.handler = serverless(app);