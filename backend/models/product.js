module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      productName: { type: DataTypes.STRING, allowNull: false },
      brandName: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      productImage: { type: DataTypes.ARRAY(DataTypes.STRING) }, // FIX: Define array type explicitly
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.FLOAT },
      sellingPrice: { type: DataTypes.FLOAT },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );
  return Product;
};
