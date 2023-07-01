const mongoose = require('./connection');

const fruitSchema = new mongoose.Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String
});

const Fruit = mongoose.model('fruit', fruitSchema);

module.exports = Fruit;