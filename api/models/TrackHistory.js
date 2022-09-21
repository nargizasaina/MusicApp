const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
   },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
});

TrackHistorySchema.methods.generateTime = function () {
    this.datetime = new Date().toISOString();
};

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
module.exports = TrackHistory;
