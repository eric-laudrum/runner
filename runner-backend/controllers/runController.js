const Run = require('../models/Run');

exports.saveRun = async (req, res) => {
    try {
        const { user, title, startTime, endTime, totalDistance, totalDuration, route, weatherCondition, airQualityIndex } = req.body;

        // Create a new run document from payload
        const newRun = new Run({
            user,
            title,
            startTime,
            endTime,
            totalDistance,
            totalDuration,
            route,
            weatherCondition,
            airQualityIndex
        });

        const savedRun = await newRun.save();
        res.status(201).json(savedRun);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserRuns = async (req, res) => {
    try {
        const { userId } = req.params;

        // Retrieve user's run history
        const runs = await Run.find({ user: userId }).sort({ startTime: -1 });
        res.status(200).json(runs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};