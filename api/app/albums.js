const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const Album = require('../models/Album');

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
        if (req.query.artist) {
            const albumsById = await Album.find({artist: req.query.artist});
            res.send(albumsById);
        } else {
            const albums = await Album.find();
            res.send(albums);
        }

    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const album = await Album
            .findById(req.params.id)
            .populate('artist', 'title image description');

        if (!album) {
            res.status(404).send({message: 'Album not found!'})
        }
        res.send(album);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {title, artist, year} = req.body;
    if (!title || !artist || !year || !req.file) {
        return res.status(400).send({error: 'Data is not valid'});
    }

    const albumData = {
        title,
        artist,
        year,
        image: req.file.filename,
    };

    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;

