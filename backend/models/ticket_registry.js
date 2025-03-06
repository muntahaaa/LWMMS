// models/ticketRegistry.js
module.exports = (sequelize, DataTypes) => {
    const TicketRegistry = sequelize.define(
      "TicketRegistry",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ticket_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "tickets",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users", // assuming there's a `users` table
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        purchase_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          defaultValue: DataTypes.NOW, // automatically sets to current date
        },
        entry_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        tableName: "ticket_registries",
        timestamps: true, // No need for createdAt and updatedAt
      }
    );
  
      // A ticket registry belongs to a ticket
      


    return TicketRegistry;
  };
  