var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var professionals = require('./api/routes/professionals.js')
var patients = require('./api/routes/patients.js')
var login = require('./api/routes/login.js')

app.listen(port);

app.use('/professionals', professionals)
app.use('/patients', patients)
app.use('/login', login)

console.log('Product Demo  RESTful API server started on: ' + port);
