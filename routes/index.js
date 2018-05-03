var express = require('express');
var router = express.Router();

const {
  homepage,
  findOrCreate,
  generateJWTToken
} = require('../controllers/indexController')

/* GET home page. */
router.get('/', homepage);


// POST
router.post('/', findOrCreate, generateJWTToken)

module.exports = router;
