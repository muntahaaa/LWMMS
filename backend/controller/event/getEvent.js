const { Event } =require ("../../models");

const getEventController = async (req, res) =>{
    try {
        // ✅ Sequelize equivalent of `find().sort({ createdAt: -1 })`
        const allEvents = await Event.findAll({
            order: [["createdAt", "DESC"]], // Sort by `createdAt` in descending order
        });

        res.json({
            message: "All Events",
            success: true,
            error: false,
            data: allEvents
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getEventController; 