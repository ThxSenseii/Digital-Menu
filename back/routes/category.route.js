'use strict'

const express = require('express');
const api = express.Router();
const categoryController = require('../controllers/category.controller');
const md = require('../middleware/auth.md');

api.get('', categoryController.getAll);
api.post('', md.authorize, categoryController.save);
api.delete('/:categoryId', md.authorize, categoryController.remove);

module.exports = api;