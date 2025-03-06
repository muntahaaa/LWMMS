const { Event } = require("../../models"); // Import Sequelize User model

async function eventDetailsController(req, res) {
    try {
        

       
        const selectedEvent = await Event.findOne({ where: { id: req.eventId } });

        if (!selectedEvent) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            data: selectedEvent,
            error: false,
            success: true,
            message: "Event details",
        });

       
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = eventDetailsController;
