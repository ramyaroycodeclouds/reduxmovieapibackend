const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
	password: {type: String, required: true}
});



userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password)
{
    return bcrypt.compareSync(password, this.Password);
};

module.exports = mongoose.model(
    'User', userSchema, 'User');