const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    description: String,
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

ArtistSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;