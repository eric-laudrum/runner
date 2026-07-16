const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
    latitude:{
        type: Number,
        required: true,
    },
    longitude:{
        type: Number,
        required: true,
    },
    altitude: Number,
    speed: Number,
    timestamp:{
        type: Date,
        required: true,
    }
}, {
    _id: false,
});

const runSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title:{
        type: String,
        default: 'New Run',
    },
    startTime:{
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    totalDistance: {
        type: Number, // distance in meters
        default: 0,
    },
    totalDuration: {
        type: Number, // time in seconds
        default: 0,
    },
    route: [coordinateSchema],
    weatherCondition: String,
    airQualityIndex: Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model("Run", runSchema);