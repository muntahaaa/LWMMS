module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { // The field name should match with your migration (title instead of productName)
        type: DataTypes.STRING,
        allowNull: false,
      },
      contributorName: { 
        type: DataTypes.STRING,
      },
      category: { 
        type: DataTypes.STRING,
      },
      time_period: { 
        type: DataTypes.STRING,
      },
      significance_level: { 
        type: DataTypes.STRING,
      },
      tags: { 
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      productImage: { 
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      description: { 
        type: DataTypes.TEXT,
      },
      latitude: { 
        type: DataTypes.FLOAT,
      },
      longitude: { 
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "products",
      timestamps: true, // Automatically adds createdAt and updatedAt columns
    }
  );
  return Product;
};
