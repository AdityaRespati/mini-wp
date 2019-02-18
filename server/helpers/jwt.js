require('dotenv').config()
const jwt = require('jsonwebtoken')

function jwtSign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

function jwtVerify(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { jwtSign, jwtVerify }