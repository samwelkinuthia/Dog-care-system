# DOG CARE SYSTEM

Dog care system with sound recognition, feeding mechanism and supporting web application.

## About

A demo project that simulates a dog care system with the three functionalities above. Sound classifcation is done for the "bark", "growl" and "whine" sounds that can each be used to determine the dog's mental/physical state. Scheduling is done for deworming, feeding and grooming.

## Project diagram

![Screenshot from 2022-01-09 21-43-38](https://user-images.githubusercontent.com/27720313/149065175-897fc710-43d3-493b-9700-8e1ea22c33d0.png)


The servomotor can be attached to a dog feeder with rotating dispense. More info about the servo can be viewed on this [repo](https://github.com/samwelkinuthia/Node-React-js-servo-control-).


## Installation

### 1. Raspberry pi audio classifier setup
* Use [edge impulse](https://www.edgeimpulse.com/) to train an audio classifier model.
* Create a [mongodb atlas](https://www.mongodb.com/atlas/database) account and create a database.
* Follow the steps in the [mongodb docs](https://docs.mongodb.com/manual/reference/connection-string/) to obtain the connection string.
* Follow the steps in the [servo control repo](https://github.com/samwelkinuthia/Node-React-js-servo-control-) to setup the Raspberry Pi - Servomotor control.
* Clone the [sound classifier repo](https://github.com/samwelkinuthia/edge-impulse-audio-classifier) on the pi and follow the steps in the readme. Open a terminal and install edge-impulse by running ```npm install edge-impulse-linux -g --unsafe-perm```.
* Ensure [SoX](http://sox.sourceforge.net/) is installed.
* Download your model file from your Edge Impulse project/account with: ```edge-impulse-linux-runner --download modelfile.eim```
* Connect a microphone and run ```node classify-audio.js modelfile.eim <microphone name>```

### 2. Web app setup

* Clone this repo on your machine.
* Install required dependencies by running ```npm install``` in both the server and client folders.
* Obtain mongodb connection string and twilio api keys from mongodb atlas and [Twilio](https://www.twilio.com/)
* In the server folder, create a ```.env``` file, add the following entries and replace:
```
ATLAS_URL = <your mongodb connection string>
TWILIO_ACCOUNT_SID = <your twilio sid>
TWILIO_AUTH_TOKEN = <your twilio auth token>
```
* Edit ```server.js``` and add your twilio details
```
function sendSms(message) {
  client.messages
      .create({
        body: message,
        from: 'YOUR TWILIO ACCOUNT NUMBER',
        to: 'TWILIO CONNECTED PHONE NUMBER'
      })
      .then(message => console.log(message.sid));
}
```
* Install nodemon globally by running ```npm install -g nodemon```
* In the server folder run ```nodemon server.js```
* In the client folder run ```npm start``` and navigate to [https://localhost:3000]()

### Pre-Requisites

* Edge impulse modelfile
* Node Js
* SoX
