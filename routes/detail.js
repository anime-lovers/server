const express = require('express');
const router = express.Router();

const {
  detailPage
} = require('../controllers/detailController')


//GET 
router.get('/', detailPage)



module.exports = router