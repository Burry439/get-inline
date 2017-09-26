var teacherSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    isAvalible : Boolean
})

var Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher