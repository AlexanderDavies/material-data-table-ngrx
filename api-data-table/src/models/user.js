const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  surname: {type: String, required: true},
  role: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

userSchema.index({email: 1, firstName: 1, surname: 1, role: 1});

module.exports = mongoose.model('User', userSchema);
