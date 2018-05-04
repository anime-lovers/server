const AnimeList = require('../models/animelist')
const jwt = require('jsonwebtoken')
const secretKey = process.env.MY_SECRET

function findOrCreateAnimeList(animeName, userId, cb) {
  AnimeList.findOne({
    name: animeName,
    userId
  })
  .then(result => {
    if (!result) {
      createDoc(animeName, userId, (err, anime) => {
        cb(err, anime)
      })
    }
    cb(null, result)
  })
  .catch(err => {
    cb(err)
  })
}

function createDoc(name, userId) {
  AnimeList.create({ name, userId })
  .then(result => {
    cb(null, result)
  })
  .catch(err => {
    cb(err, null)
  })
}

module.exports = {
  inputAnime(req, res, next) {
    const {
      token,
      title_anime
    } = req.body

    let decoded = jwt.verify(token, secretKey)

    console.log('--------ini decode', decoded)
    console.log('--------ini title', title_anime)
    findOrCreateAnimeList(title_anime, decoded.userId, (err, result) => {
      if(err) res.send(500).json({data:err})
      res.status(200).json({
        message: 'anime saved',
        data:result
      })
    })
  }
}