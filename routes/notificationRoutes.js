const express = require('express');
const Notification = require('../models/notification');

const router = express.Router();

// Create a new notification
router.post('/notification', async (req, res) => {
    const notification = new Notification(req.body);
    try {
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Fetch notifications for a user
router.get('/notifications/:userId', async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId });
        res.send(notifications);
    } catch (error) {
        res.status(500).send();
    }
});

// Mark a notification as read
router.patch('/notification/:id', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).send();
        }
        notification.read = true;
        await notification.save();
        res.send(notification);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
