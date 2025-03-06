const { User, Ticket, TicketRegistry } = require("../../models"); // Import Sequelize models

const LogTicketController = async (req, res) => {
    try {
        // Fetch all ticket registry records with associated User (name) and Ticket (type)
        const allTicketItems = await TicketRegistry.findAll({
            attributes: ["id", "quantity", "ticket_id", "user_id"], // Select relevant TicketRegistry fields
            include: [
                {
                    model: User,
                    attributes: ["name"], // Fetch only 'name' from User table
                    as: "user", // Use the alias defined in associations
                },
                {
                    model: Ticket,
                    attributes: ["type"], // Fetch only 'type' from Ticket table
                    as: "ticket", // Use the alias defined in associations
                },
            ],
        });

        if (!allTicketItems.length) {
            return res.json({
                message: "No tickets found in the log",
                success: true,
                error: false,
                data: [],
            });
        }

        // Format the response data correctly
        const formattedTicketData = allTicketItems.map((ticketItem) => ({
            userName: ticketItem.user ? ticketItem.user.name : "User not found", // Fetch name from User table
            ticketType: ticketItem.ticket ? ticketItem.ticket.type : "Ticket not found", // Fetch type from Ticket table
            quantity: ticketItem.quantity,
            ticketId: ticketItem.ticket_id,
            userId: ticketItem.user_id,
        }));

        res.json({
            data: formattedTicketData,
            success: true,
            error: false,
        });
    } catch (err) {
        console.error("Error in LogTicketController:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

module.exports = LogTicketController;
