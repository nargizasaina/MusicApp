const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const Track = require('../models/Track');
const auth = require("../middleware/auth");
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const sort = { datetime: -1 };
    try{
        const tracks = await TrackHistory
            .find({user: req.user._id})
            .sort(sort)
            .populate(
                {path: 'track', select: 'title',
                    populate: {path: 'album', select: 'artist',
                        populate: {path: 'artist', select: 'title'}},
                });
        console.log(tracks);
        res.send(tracks);
    } catch (e) {

    }
});

router.post('/',auth, async (req, res) => {
    const track = req.body.track;
    const trackHistoryData = {track, user: req.user._id};

    try{
        const trackInBase = await Track.findById(track);
        if (!trackInBase) {
            return res.status(404).send({error: 'Not found'});
        }

        const trackHistory = new TrackHistory(trackHistoryData);
        trackHistory.generateTime();
        await trackHistory.save();

        res.send(trackHistory);
    } catch (e) {
        res.status(400).send(e);
    }

});

module.exports = router;