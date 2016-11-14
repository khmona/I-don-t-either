var mongoose= require('mongoose');

var customerSchema = mongoose.Schema({

	name: {type: String, required: true},
	number: {type: String, required: true},
  
})

module.exports= m.mongoose.model('customers', customerSchema)