const uploadProductPermission = require("../../helpers/permission");
const {Event} = require("../../models"); 

async function UploadEventController(req, res) {
    try {
        const sessionUserId = req.userId;
        const hasPermission = await uploadProductPermission(sessionUserId);
        if (!hasPermission) {
            throw new Error("Permission denied");
        }

        const saveEvent = await Event.create(req.body);
        res.status(201).json({
            message: "Event added successfully",
            error: false,
            success: true,
            data: saveEvent
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }

}

module.exports = UploadEventController;