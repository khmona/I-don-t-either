var mongoose= require('mongoose');

var spareSchema = mongoose.Schema({

	serial: {type: String, required: true},
	fitsModel: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},


})

module.exports= m.mongoose.model('spareParts', spareSchema)