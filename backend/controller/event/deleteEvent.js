const uploadProductPermission = require("../../helpers/permission");
const express = require('express');
const router = express.Router();
const { Event } =require ("../../models");

const deleteEventController = async (req, res) => {
    const hasPermission = await uploadProductPermission(req.userId);
    if (!hasPermission) {
      throw new Error("Permission denied");
    }
    const eventId = req.params.id; // Use req.params.id to get the event ID from the URL
    console.log("Received Event ID:", eventId);
    if (!req.params.id) {
        return res.status(400).json({ success: false, message: "Missing event ID" });
    }
    try {
        const event = await Event.findByPk(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        await event.destroy();
        return res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the event' });
    }
};

module.exports=deleteEventController;