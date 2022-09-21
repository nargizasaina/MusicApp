const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        if (req.query.album) {
            const tracksById = await Track.find({album: req.query.album});
            res.send(tracksById);
        }  else if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}, "_id title artist");
            const tracks = await Track
                .find({album: {$in: albums}})
                .populate('album');
            res.send(tracks);
        } else {
                const tracks = await Track.find();
                res.send(tracks);
        }

    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {title, album, length} = req.body;
    if (!title || !album || !length) {
        return res.status(400).send({error: 'Data is not valid'});
    }

    const trackData = {
        title,
        album,
        length,
    };

    try {
        const track = new Track(trackData);
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;

