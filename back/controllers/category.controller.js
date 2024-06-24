'use strict'

const Category = require('../models/category.model');
const Food = require('../models/food.model');

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

function remove(req, res) {
  let categoryId = req.params.categoryId;
  Food.find({ category: categoryId }).then(foods => {
    foods.forEach(food => {
      food.remove();
    }).then(() => {
      Category.findById(categoryId).then(category => {
        category.remove().then(() => {
          return res.status(200).send({ message: 'Categoría eliminada correctamente'});
        }).catch(err => {
          return res.status(500).send({ message: `Error al eliminar la categoría: ${err}` });
        });
      }).catch(err => {
        return res.status(404).send({ message: `La categoría no existe: ${err}` });
      });
    });
  })
}

module.exports = {
  getAll,
  save,
  remove
}