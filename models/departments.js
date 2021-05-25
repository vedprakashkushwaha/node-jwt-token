const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Departments = mongoose.model('Departments', departmentSchema);
// exports.departmentSchema = departmentSchema;
exports.Departments = Departments; 
