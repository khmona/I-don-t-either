var mongoose= require('mongoose');

var CarSchema = mongoose.Schema({

	reg: {type: String, required: true},
	model: {type: String, required: true},
	owner: {type: mongoose.Schema.Types.ObjectID, ref:'Customers'},
	damages: {type: mongoose.Schema.Types.ObjectID, ref:'Damage'},

})

module.exports= m.mongoose.model('Car', carSchema)