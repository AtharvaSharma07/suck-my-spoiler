const axios = require('axios');
function sendSMS(data) {
  axios.post('https://www.fast2sms.com/dev/bulk', data, {
    headers: { Authorization: process.env.fast2SMS }
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function scheduleSMS(spoilerID) {
  userDBName = process.env.UserDBName
  spoilerDBName = process.env.SpoilerDBName
  const db = require("../db").getDB();
  let spoiler = await db.collection(spoilerDBName).find({ "_id": spoilerID }).toArray();
  console.log(spoiler)
  let users = await db.collection(userDBName).find({}).toArray();
  users.map(user => {
    let smsData = {
      "sender_id": "FSTSMS",
      "message": spoiler[0].content,
      "language": "english",
      "route": "p",
      "numbers": user.phoneno,
    }
    console.log("Scheduled",smsData)
    sendSMS(smsData)
  })
}
module.exports = {
  scheduleSMS
} 
