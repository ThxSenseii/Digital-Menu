'use strict'

const Category = require('../models/category.model');

function getAll(req, res) {
  Category.find().then(categories => {
    return res.status(200).send(categories);
  }).catch(err => {
    return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
  });
}

function save(req, res) {
  let category = new Category(req.body);
  category.save().then(() => {
    return res.status(200).send({ message: 'Categoría guardada correctamente'});
  }).catch(err => {
    return res.status(500).send({ message: `Error al guardar la categoría: ${err}` });
  });
}

module.exports = {
  getAll,
  save
}