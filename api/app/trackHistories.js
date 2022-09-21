const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    const track = req.body.track;

    if (!track) {
        return res.status(400).send({error: 'Track is not present!'});
    }

    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present!'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    const trackHistoryData = {track, user: user._id};

    try{
        const trackHistory = new TrackHistory(trackHistoryData);
        trackHistory.generateTime();
        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send(e);
    }

});

module.exports = router;