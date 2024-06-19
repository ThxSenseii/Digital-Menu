'use strict'

const User = require('../models/user.model');

function login(req, res) {
  const { user, password } = req.body;
  User.findOne({ user, password }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ token: createToken(user) });
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