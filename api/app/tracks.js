const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', async (req, res) => {
    const sort = {number: 1};
    try{
        if (req.query.album) {
            const tracksById = await Track
                .find({album: req.query.album})
                .sort(sort)
                .populate(
                    {path: 'album', select: 'title',
                        populate: {path: 'artist', select: 'title'}
                    });

            res.send(tracksById);
        }  else if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}, "_id title artist");
            const tracks = await Track
                .find({album: {$in: albums}})
                .sort(sort)
                .populate('album');

            res.send(tracks);
        } else {
                const tracks = await Track.find().sort(sort).populate('album', 'title');
                res.send(tracks);
        }

    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth, async (req, res) => {
    const {title, album, length} = req.body;

    let number = 1;
    const tracks = await Track.find();
    if (tracks.length > 0) {
        number = tracks[tracks.length - 1].number + 1;
    }

    const trackData = {
        title,
        album,
        length,
        number,
        addedBy: req.user._id
    };

    try {
        const track = new Track(trackData);
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    console.log(req.params.id);

    try{
        const track = await Track.findById(req.params.id);
        if (!track) {
            res.status(404).send({message: 'Track is not found!'});
        }

        const publishedTrack = {...track._doc, publish: true};
        const updateTrack = await Track.findByIdAndUpdate(req.params.id, publishedTrack);
        res.send(updateTrack);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try{
        await Track.findByIdAndDelete(req.params.id);
        res.send('Track is deleted successfully!');
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;

