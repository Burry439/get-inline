var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    isAvalible : Boolean,
    // currentStu: String
});

var Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher;