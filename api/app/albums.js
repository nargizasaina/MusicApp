const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const config = require('../config');
const Album = require('../models/Album');
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
    const sort = {year: 1};

    try{
        if (req.query.artist) {
            const albumsById = await Album
                .find({artist: req.query.artist})
                .sort(sort)
                .populate('artist', 'title');

            res.send(albumsById);
        } else {
            const albums = await Album
                .find()
                .sort(sort)
                .populate('artist', 'title');

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

router.post('/', auth, upload.single('image'), async (req, res) => {
    const {title, artist, year} = req.body;

    const albumData = {
        title,
        artist,
        year,
        image: req.file && 'uploads/' + req.file.filename,
        addedBy: req.user._id
    };

    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res) => {
    try{
        const album = await Album.findById(req.params.id);
        if (!album) {
            res.status(404).send({message: 'Album is not found!'});
        }

        const publishedAlbum = {...album._doc, publish: true};
        const updateAlbum = await Album.findByIdAndUpdate(req.params.id, publishedAlbum);
        res.send(updateAlbum);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try{
        await Album.findByIdAndDelete(req.params.id);
        res.send('Album is deleted successfully!');
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;

