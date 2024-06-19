'use strict'

const User = require('../models/user.model');

function login(req, res) {
  const { user, password } = req.body;
  User.findOne({ user, password }).then(user => {
    res.status(200).send({ token: createToken(user) });
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
}

function createToken(user) {
  const time = require('moment');
  const secret = process.env.SECRET
  const token = {
    id: user._id,
    exp: time().add(1, 'days').unix()
  }
  return jwt.encode(token, secret)
}

module.exports = { login }