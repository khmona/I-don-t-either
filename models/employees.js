var mongoose= require('mongoose');

var employeesSchema = mongoose.Schema({

	SSN: {type: Number, required: true},
	Name: {type: String, required: true},
	vacation: {type: Array, required: false},


})

module.exports= m.mongoose.model('Employees', employeesSchema)