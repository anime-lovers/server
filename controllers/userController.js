const jwt = require('jsonwebtoken')
const secretKey = process.env.MY_SECRET

module.exports = {
  auth(req, res, next) {
    let token = req.body.token
    let decoded = jwt.verify(token, secretKey)
    if (!decoded) {
      return res.status(401).json({
        message: 'Please login first'
      })
    }
    // let animeId = 
    res.status(200).json()
  }
}