var mongoose = require('mongoose');


var currentSeSchema = new mongoose.Schema({
    Brandon: String,
    Hadas: String,
    Omer: String
});

var CurrentSe = mongoose.model('Session', currentSeSchema);

module.exports = CurrentSe;