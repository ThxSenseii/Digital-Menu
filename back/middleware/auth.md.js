'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = process.env.SECRET;
const User = require('../models/user.model');

function authorize (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No token' });
  }
  const token = req.headers.authorization.replace(/['"]+/g,'')
  const payload = jwt.decode(token, secret);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token expired' });
  }

  User.findById(payload.id, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authorize };