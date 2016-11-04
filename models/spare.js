var mongoose= require('mongoose');

var spareSchema = mongoose.Schema({

	name: {type: String, required: true},
	partnu: {type: Number, required: true},
	price: {type: Number, required: true},
	model: {type: String, required: true},


})

module.exports= m.mongoose.model('Spare', spareSchema)