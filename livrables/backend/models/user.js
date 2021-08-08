const mongoose = require('mongoose');
// Plugin qui permet de rendre unique chaque User
const uniqueValidator = require('mongoose-unique-validator');

// Création du model User
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
