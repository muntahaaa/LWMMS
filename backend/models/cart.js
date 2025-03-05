module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Events", key: "id" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      registrationFee: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
      paymentStatus: { type: DataTypes.ENUM("pending", "paid"), defaultValue: "pending" },
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      tableName: "carts",
      timestamps: true,
    }
  );

  return Cart;
};
