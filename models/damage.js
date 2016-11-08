var mongoose= require('mongoose');

var damageSchema = mongoose.Schema({

	description: {type: String, required: true},
	hasWorkedOn: {type: mongoose.Schema.Types.ObjectID, ref:'Employees'},
	hasWorkedForMinutes: {type: Number, required: true},
  sparePartsUsed: {type: mongoose.Schema.Types.ObjectId, ref: 'sparePart'},  

})

module.exports= m.mongoose.model('damage', damageSchema)