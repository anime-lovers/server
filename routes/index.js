var express = require('express');
var router = express.Router();

const {
  findOrCreate,
  generateJWTToken
} = require('../controllers/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// POST
router.post('/', findOrCreate, generateJWTToken)

module.exports = router;
