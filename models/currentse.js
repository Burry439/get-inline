var mongoose = require('mongoose');

var teacherSession = new mongoose.Schema({
    teacherName: String,
    studentName: String
});

var currentSeSchema = new mongoose.Schema({
    brandon: teacherSession,
    hadas: teacherSession,
    omer: teacherSession
});

var CurrentSe = mongoose.model('Session', currentSeSchema);

module.exports = CurrentSe;