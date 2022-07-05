const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {type: String, required : true},
    last_name: {type: String, required : true},
    designation: {type: String, required : true},
    tags: {type: Array, required : true},
    age: {type: String, required: true}
})

module.exports = mongoose.model('Employee', employeeSchema);