const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true

    },
    easyToMake: {
        type: Number,
        required: true,
    },
    quickToMake: {
        type: Number,
        required: true,
    },
    taste: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;