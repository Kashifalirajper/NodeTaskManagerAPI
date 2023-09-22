const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    },
    relatedTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
