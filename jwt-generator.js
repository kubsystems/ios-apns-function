var jwt = require('jsonwebtoken')
var fs = require('fs')
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

var cert = fs.readFileSync('APNsAuthKey_YB84GPV2XK.p8')
var token = jwt.sign(payload, cert, { algorithm: 'ES256' })
console.log("Token ", token)