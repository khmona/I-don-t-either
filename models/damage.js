var mongoose= require('mongoose');

var damageSchema = mongoose.Schema({

	description: {type: String, required: true},
	car: {type: mongoose.Schema.Types.ObjectID, ref:'Car'},
	workers: {type: mongoose.Schema.Types.ObjectID, ref:'Employees'},
	hours: {type: Number, required: true},
	status: {type: String, required: true},

})

module.exports= m.mongoose.model('Damage', damageSchema)