var mongoose= require('mongoose');

var employeesSchema = mongoose.Schema({

	SSN: {type: String, required: true},
	name: {type: String, required: true},
	vacation: {type: mongoose.Schema.Types.ObjectId, ref: 'vacations'},


})

module.exports= m.mongoose.model('employees', employeesSchema)