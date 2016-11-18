var mongoose= require('mongoose');

var damageSchema = mongoose.Schema({

	description: {type: String, required: true},
	hasWorked: {type: mongoose.Schema.Types.ObjectId, ref:'employees'},
	hasWorkedForMinutes: {type: Number, required: true},
  sparePartsUsed: {type: mongoose.Schema.Types.ObjectId, ref: 'spareParts'}, 
  status: {type:String, required:true},

})

module.exports= m.mongoose.model('damages', damageSchema)