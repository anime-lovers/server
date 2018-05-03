module.exports = {
  auth(req, res, next) {
    let token = req.body.token
    if (!token) {
      return res.status(401).json({
        message: 'Please login first'
      })
    }
    res.status(200).json()
  }
}