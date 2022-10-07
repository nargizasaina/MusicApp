const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1000,
        max: 2023
    },
    image: {
        type: String,
        required: true
    },
    publish: {
        required: true,
        type: Boolean,
        default: false,
        enum: [false, true]
    },
    addedBy: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

AlbumSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;