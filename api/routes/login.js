var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the about route
router.get('/', function (req, res) {
  res.send('Login shiz')
})

module.exports = router
