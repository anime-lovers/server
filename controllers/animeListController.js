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
  auth(req, res, next) {
    let token = req.body.token
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err) {
        console.log(err)
        return res.status(401).json({
          message: 'please login first'
        })
      }
      res.locals.decoded = decoded
      res.locals.animeName = req.body.title_anime
      next()
    })
    
  },

  inputAnime(req, res, next) {
    let title_anime = res.locals.animeName
    let decoded = res.locals.decoded

    findOrCreateAnimeList(title_anime, decoded.userId, (err, result) => {
      if(err) res.send(500).json({data:err})
      res.status(200).json({
        message: 'anime saved',
        data:result
      })
    })
  },

  getAnimeByUserId(req, res, next) {
    let decoded = res.locals.decoded
    let userId = decoded.userId
    AnimeList.find({userId}).select('name')
    .then(list => {
      let nameList = list.map(function(list) {
        return list.name
      })
      if (!list) {
        return res.status(204).json({
          message: "You don't have any favorite anime yet"
        })
      }
      res.status(200).json({
        message: 'Anime list loaded',
        data: nameList
      })
    })
    .catch(err => {
      res.status(500).json()
    })
  }
}