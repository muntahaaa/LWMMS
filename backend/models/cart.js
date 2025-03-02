module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    },
    {
      tableName: "cart",
      timestamps: true,
    }
  );
  return Cart;
};
