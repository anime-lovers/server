const jwt = require('jsonwebtoken')
const User = require('../models/user')

const secretKey = process.env.MY_SECRET

module.exports = {
  findOrCreate(req, res, next) {
    let { name, email } = req.body
    User.findOne({email})
    .then(user => {
      if (!user) {
        User.create({ name, email }, function (err, result) {
          if (err) {
            console.log(err)
            return res.status(500).json()
          } 
          console.log(result)
          next()
        })
      }
      console.log(user)
      next()  
    })
  },

  generateJWTToken(req, res, next) {
    let payload = req.body
    console.log('------------payload',payload)
    console.log('------------secret', secretKey)
    let token = jwt.sign(payload, secretKey)
    res.status(200).json({
      message: 'token generated',
      data: token
    })
  }
}