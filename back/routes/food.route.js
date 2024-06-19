'use strict'

const express = require('express');
const api = express.Router();
const foodController = require('../controllers/food.controller');
const md = require('../middleware/auth.md');

api.get('', foodController.getAll);
api.get('/:category', foodController.getByCategory);
api.post('', md.authorize, foodController.save);

module.exports = api;