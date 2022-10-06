const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try{
        const artists = await Artist.find();
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {title, description} = req.body;

    const artistData = {
        title,
        image: null,
        description: description || null,
    };

    if (req.file) {
        artistData.image = 'uploads/' + req.file.filename;
    }

    try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try{
        await Artist.findByIdAndDelete(req.params.id);
        res.send('Artist is deleted successfully!');
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;