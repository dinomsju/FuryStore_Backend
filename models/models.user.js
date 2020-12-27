const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // enum: 10,
        default: '',
    },
    address: {
        type: String,
        // minlength: 6,
        default: '',
    },
    profilePicture: {
        type: String,
    },
});

const User = mongoose.model('user', userSchema);
module.exports = User;