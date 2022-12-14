const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
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

TrackSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;