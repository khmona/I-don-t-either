var mongoose= require('mongoose');

var CarSchema = mongoose.Schema({

	registration: {type: String, required: true},
	model: {type: String, required: true},
	damages: {type: mongoose.Schema.Types.ObjectID, ref:'damage'},
  customer: {type: mongoose.Schema.Types.ObjectID, ref:'csustomers'}

})

module.exports= m.mongoose.model('car', carSchema)