const mongoose = require('mongoose')
const Schema = mongoose.Schema

const animeListSchema = new Schema({
  name: String,
  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const AnimeList = mongoose.model('AnimeList', animeListSchema)