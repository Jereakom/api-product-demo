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
  res.send('Professionals with the id of '+req.params.id)
})
// get all professionals
router.get('/', function (req, res) {
  var db = new sqlite3.Database('Professionals.db')

  var professionalArray = [];

  db.serialize(function () {
    db.each('SELECT * FROM Professionals', function (err, row) {
      professionalArray.push(row)
    })

  })
  db.close(function(err){
    res.send(professionalArray)
  })

})
// add new professional
router.post('/', function (req, res) {
  var db = new sqlite3.Database('Professionals.db')

  var firstName, lastName, age, sex, languages, experience, picture, location, description;

  try {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    age = req.body.age;
    sex = req.body.sex;
    experience = req.body.experience;
    languages = req.body.languages;
    picture = "https://api.adorable.io/avatars/200/"+firstName + lastName+".png";
    location = req.body.location;
    description = req.body.description;


  } catch (e) {
    res.send("Something went wrong")
  } finally {
    console.log("firstName: "+firstName);
    console.log("lastName: "+lastName);
    console.log("age: "+age);
    console.log("sex: "+sex);
    console.log("experience: "+experience);
    console.log("languages: "+languages);
    console.log("picture: "+picture);
    console.log("location: "+location);
    console.log("description: "+description);
  }
  /*
  TODO: implement db insert
  db.serialize(function () {

  })

  db.close()
  */

  res.send("Run complete");

})

module.exports = router
