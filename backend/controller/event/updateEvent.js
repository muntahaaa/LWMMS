const uploadProductPermission = require("../../helpers/permission");
const { Event } =require ("../../models");

async function updateEventController(req, res) {
    try {
     
        const hasPermission = await uploadProductPermission(req.userId);
        if (!hasPermission) {
          throw new Error("Permission denied");
        }
    
        const { id, ...resBody } = req.body; // ✅ Fix: Change `id` to `id` for Sequelize
    
        // ✅ Sequelize equivalent of `findByIdAndUpdate()`
        const [updatedRowCount, updatedEvents] = await Event.update(resBody, {
          where: { id },
          returning: true, // ✅ Ensures updated artifact is returned
        });
    
        if (updatedRowCount === 0) {
          throw new Error("Event not found or no changes made");
        }
    
        res.json({
          message: "Event updated successfully",
          data: updatedEvents[0], // ✅ Return the updated artifact
          success: true,
          error: false,
        });
      } catch (err) {
        res.status(400).json({
          message: err.message || err,
          error: true,
          success: false,
        });
      }
}

module.exports = updateEventController;