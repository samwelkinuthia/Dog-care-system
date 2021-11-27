const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const schedule = require("node-schedule");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

app.get('/feed', (req, res) => {
  feedNow();
  res.send('success')
});

feedNow = () => {
}
//recurrent
app.post('/recurrent', (req, res) => {
  let minutes = req.body.minutes
  schedule.scheduleJob(`*/${minutes} * * * *`, function () {
    // console.log("hello world")
  });
  res.send(`Pet will be fed every ${minutes} minutes`);
  console.log(res.data)
})

// app.post('/vaccine_db', (req, res) => {
//   console.log(time);
//   schedule.scheduleJob(time, function () {
//     // console.log("hello")
//   });
//   res.send(`Servo will run at ${time}`);
//   console.log(res.data)
// });

app.post('/vaccine', (req, res) => {
  let date =  new Date();
  let vaccine = req.body.vaccine_name;
  let vaccine_t=req.body.vaccine_timer;
  let db_connect = dbo.getDb();
  let message = "Reminder to vaccinate your dog";
  let myobj = {
    vaccine_name: vaccine,
    vaccination_date: date
  };
  res.send(`Reminder set from date ${date.getDate()}`);
  db_connect.collection("vaccines").insertOne(myobj, function (err, resp) {
  });
  let time = vaccine_t;
  console.log(time);
  schedule.scheduleJob(`*/${time} * * * *`, function () {
    sendSms(message);
  });
  // res.send(`Servo will run at ${time}`);
  // console.log(res.data)
})

app.post('/deworm', (req, res) => {
  let date =  new Date();
  let db_connect = dbo.getDb();
  let message = "Reminder to deworm your dog today";
  let myobj = {
    deworming_date: date
  };
  res.send(`Reminder set from date ${date.getDate()}`);
  db_connect.collection("deworming").insertOne(myobj, function (err, resp) {
  });
  schedule.scheduleJob(`*/2 * * * *`, function () {
    sendSms(message);
  });
})

app.post('/groom', (req, res) => {
  let date =  new Date();
  let message = "Reminder to groom your dog today";
  let db_connect = dbo.getDb();
  let myobj = {
    grooming: date
  };
  res.send(`Reminder set from date ${date.getDate()}`);
  db_connect.collection("grooming").insertOne(myobj, function (err, resp) {
    console.log("grooming date inserted")
  });
  schedule.scheduleJob('groom',`*/2 * * * *`, function () {
    let count = 0;
    while (count < 2) {
      sendSms(message)
      count++
      schedule.cancelJob('groom')
      console.log(count);
    }
    console.log(count)
  });
})

function sendSms(message) {
  client.messages
      .create({
        body: message,
        from: '+15707745109',
        to: '+254715301424'
      })
      .then(message => console.log(message.sid));
}