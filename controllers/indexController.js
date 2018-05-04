const jwt = require('jsonwebtoken')
const User = require('../models/user')

const secretKey = process.env.MY_SECRET

module.exports = {
  homepage(req, res, next) {
    res.status(200).json({
      message: 'successfully load homepage'
    })
  },

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
          console.log('bikin doc baru',result)
          res.locals.user = result
          next()
        })
      }
      console.log('doc udah ada',user)
      res.locals.user = user
      next()  
    })
  },

  generateJWTToken(req, res, next) {
    //local user
    const userId = res.locals.user._id
    const name = res.locals.user.name
    const email = res.locals.user.email
    const payload = { userId, name, email }
    
    console.log('------------payload',payload)
    console.log('------------secret', secretKey)
    let token = jwt.sign(payload, secretKey)
    res.status(200).json({
      message: 'token generated',
      data: token
    })
  }
}