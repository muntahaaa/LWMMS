const { TicketRegistry, Ticket } = require("../../models");

const viewTicketController = async (req, res) => {
  const userId = req.userId;

  try {
    // Fetch the tickets purchased by the user with eager loading of Ticket model
    const purchasedTickets = await TicketRegistry.findAll({
      where: { user_id: userId }, // Use correct column name `user_id`
      include: [
        {
          model: Ticket,
          as: "ticket", // Use alias defined in TicketRegistry model
          attributes: [
            "id",
            "type",
            "price",
            "total_quantity",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    if (purchasedTickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased tickets found.",
        data: [],
      });
    }

    console.log("Purchased Ticket --", purchasedTickets);

    return res.status(200).json({
      success: true,
      message: "Purchased tickets retrieved successfully.",
      data: purchasedTickets,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving purchased tickets. Please try again later.",
    });
  }
};

module.exports = viewTicketController;
