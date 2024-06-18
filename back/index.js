'use strict'

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoChain = process.env.MONGO || 'mongodb://localhost:27017/restaurant';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Allow', 'GET, POST, OPTIONS');
  next();
});

mongoose.connect(mongoChain).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})

const FoodRoute = require('./routes/food.route');
const CategoryRoute = require('./routes/category.route');
app.use('/api/food', FoodRoute);
app.use('/api/category', CategoryRoute);