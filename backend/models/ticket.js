// models/ticket.js
module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define(
      "Ticket",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,  // ticket type (e.g., VIP, General)
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,  // ticket price
        },
        total_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,  // max number of tickets available per day
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        tableName: "tickets",
        timestamps: true, // Sequelize will automatically manage createdAt and updatedAt
      }
    );
  
  
    return Ticket;
  };
  