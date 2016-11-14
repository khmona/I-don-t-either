var mongoose= require('mongoose');

var vacationSchema = mongoose.Schema({

	from: {type: Date, required: true},
	to: {type: Date, required: true},
	

})

module.exports= m.mongoose.model('vacations', vacationSchema)