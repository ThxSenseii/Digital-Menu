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
  if(req.body._id) {
    food.updateOne(food).then(() => {
      return res.status(200).send({ message: 'Plato actualizado correctamente'});
    }).catch(err => {
      return res.status(500).send({ message: `Error al actualizar el plato: ${err}` });
    });
  } else {
    food.save().then(() => {
      return res.status(200).send({ message: 'Plato guardado correctamente'});
    }).catch(err => {
      return res.status(500).send({ message: `Error al guardar el plato: ${err}` });
    });
  }
}

function remove(req, res) {
  let foodId = req.params.foodId;
  Food.findById(foodId).then(food => {
    food.deleteOne({_id:foodId}).then(() => {
      return res.status(200).send({ message: 'Plato eliminado correctamente'});
    }).catch(err => {
      return res.status(500).send({ message: `Error al eliminar el plato: ${err}` });
    });
  }).catch(err => {
    return res.status(404).send({ message: `El plato no existe: ${err}` });
  });
}

module.exports = {
  getAll,
  getByCategory,
  save,
  remove
}