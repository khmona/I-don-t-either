var mongoose= require('mongoose');

var customersSchema = mongoose.Schema({

	Name: {type: String, required: true},
	Number: {type: Number, required: true},
	Car: {type: mongoose.Schema.Types.ObjectID, ref:'Car'},
	

})

module.exports= m.mongoose.model('Customer', customersSchema')