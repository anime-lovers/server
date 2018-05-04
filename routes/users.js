const express = require('express');
const router = express.Router();

const {
  auth
} = require('../controllers/userController')

/* GET users listing. */
router.get('/', auth)

module.exports = router;
