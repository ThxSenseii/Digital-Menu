'use strict'

const User = require('../models/user.model');
const password = require('../models/user.model');
const bcrypt = require ('bcrypt');
const jwt = require('jwt-simple')

function login(req, res) {
  const { user, password } = req.body;
  User.findOne({ user}).then(user => {
    bcrypt.compare(password, user.password, (error, ok) => {
      if(ok)
    res.status(200).send({ token: createToken(user) });
      else return res.status(403).send({message: 'Unauthorized'})
    })
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
}

function register(req, res) {
  const user = req.body;
  bcrypt.hash(user.password, 7, (err, hash) => {
    user.password = hash
    const saved = new User(user)
    saved.save().then(() => res.status(200).send({message:'Saved'}) ).catch(err => res.status(500).send({}))
  })
}

function createToken(user) {
  const time = require('moment');
  const secret = "Secreto"
  const token = {
    id: user._id,
    exp: time().add(1, 'days').unix()
  }
  return jwt.encode(token, secret)
}

module.exports = { login, register }
