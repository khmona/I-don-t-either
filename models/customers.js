var mongoose= require('mongoose');

var customersSchema = mongoose.Schema({

	name: {type: String, required: true},
	number: {type: String, required: true},
  
})

module.exports= m.mongoose.model('customer', customersSchema')