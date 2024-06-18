'use strict'

const express = require('express');
const api = express.Router();
const categoryController = require('../controllers/category.controller');

api.get('', categoryController.getAll);
api.post('', categoryController.save);

module.exports = api;