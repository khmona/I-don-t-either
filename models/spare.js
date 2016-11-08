var mongoose= require('mongoose');

var spareSchema = mongoose.Schema({

	serial: {type: String, required: true},
	fitsModel: {type: Array, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},


})

module.exports= m.mongoose.model('Spare', spareSchema)