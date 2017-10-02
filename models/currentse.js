var mongoose = require('mongoose');


var currentSeSchema = new mongoose.Schema({
    Brandon: {
        student: String,
        avail: Boolean
    },
    Hadas: {
        student: String,
        avail: Boolean
    },
    Omer: {
        student: String,
        avail: Boolean
    },
    sessionInited: Boolean
});

var CurrentSe = mongoose.model('Session', currentSeSchema);

module.exports = CurrentSe;