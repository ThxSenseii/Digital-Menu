'use strict'

const Food = require('../models/food.model');

function getAll(req, res) {
  Food.find().populate('category').then(foods => {
    return res.status(200).send(foods);
  }).catch(err => {
      return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
  });
}

function getByCategory(req, res) {
  let category = req.params.category;
  Food.find({ category: category }).populate('category').then(foods => {
    return res.status(200).send(foods);
  }).catch(err => {
    return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
  });
}

function save(req, res) {
  let food = new Food(req.body);
  food.save().then(() => {
    return res.status(200).send({ message: 'Plato guardado correctamente'});
  }).catch(err => {
    return res.status(500).send({ message: `Error al guardar el plato: ${err}` });
  });
}

module.exports = {
  getAll,
  getByCategory,
  save
}