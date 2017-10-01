var mongoose = require('mongoose');


var currentSeSchema = new mongoose.Schema({
    Brandon: String,
    Hadas: String,
    Omer: String,
    sessionInited: Boolean
});

var CurrentSe = mongoose.model('Session', currentSeSchema);

module.exports = CurrentSe;