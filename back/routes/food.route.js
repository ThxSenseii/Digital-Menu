'use strict'

const express = require('express');
const api = express.Router();
const foodController = require('../controllers/food.controller');

api.get('', foodController.getAll);
api.get('/:category', foodController.getByCategory);
api.post('', foodController.save);

module.exports = api;