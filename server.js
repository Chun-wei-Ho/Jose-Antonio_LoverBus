const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
const wakeUpDyno = require('./src/route/wakeUpDyno.js');
const DYNO_URL = "https://jose-antonio-lover-bus.herokuapp.com/"


app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')
const apiRoute = require('./src/route/api');
app.use('/api', apiRoute);
app.use(bodyParser.json());

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, ()=>{
  wakeUpDyno(DYNO_URL) 
});
console.log("Server Ready!")