const express = require('express');
const router = express.Router();

const {
  auth,
  inputAnime,
  getAnimeByUserId
} = require('../controllers/animeListController')


//POST
router.post('/', auth, inputAnime)
router.post('/favorites', auth, getAnimeByUserId)



module.exports = router