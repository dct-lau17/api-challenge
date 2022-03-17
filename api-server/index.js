const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

// handle logs route
const routes = require('./logs.js')(app, fs);

app.get('/', (req, res) => {
  res.sendFile(process.cwd()  + '/index.html');
});

const server = app.listen(3031, () => {
  console.log('listening on port %s...', server.address().port);
});