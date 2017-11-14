var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var professionals = require('./api/routes/professionals.js')
var patients = require('./api/routes/patients.js')

app.listen(port);

app.use('/professionals', professionals)
app.use('/patients', patients)

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

db.serialize(function () {
  db.run('CREATE TABLE lorem (info TEXT)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()

console.log('Product Demo  RESTful API server started on: ' + port);
