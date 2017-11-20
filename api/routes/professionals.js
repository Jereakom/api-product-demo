var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

// middleware that is specific to this router


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next()
})

router.get('/:id', function (req, res) {
  res.send('Professionals with the id of :id')
})

router.get('/', function (req, res) {
  var db = new sqlite3.Database('Professionals.db')

  var professionalArray = [];

  db.serialize(function () {
    db.each('SELECT * FROM Professionals', function (err, row) {
      console.log(row)
      professionalArray.push(row)
      console.log("proArray: "+professionalArray)
      res.send(professionalArray)
    })
  })
  db.close()

})

router.post('/', function (req, res) {
  var db = new sqlite3.Database('Professionals.db')

  console.log(req);
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

  db.serialize(function () {

  })

  db.close()
})

module.exports = router
