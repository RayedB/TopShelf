var mongoose = require('mongoose');

var IngredientsSchema = new mongoose.Schema({
	name: String,
	quantity: { type: Number , min: 0}
});

var Ingredients = mongoose.model('Ingredients',IngredientsSchema);


module.exports = Ingredients