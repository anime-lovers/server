const express = require('express');
const router = express.Router();

const {
  inputAnime
} = require('../controllers/animeListController')


//POST

router.post('/', inputAnime)



module.exports = router