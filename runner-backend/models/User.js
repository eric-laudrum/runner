const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    confirmPassword:{
        type: String,
        required: true,
    },

    stravaId:{
        type: String,
        sparse: true,
        unique: true,
    },

    stravaAccessToken: String,
    stravaRefreshToken: String,
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);