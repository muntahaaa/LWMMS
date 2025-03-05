module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eventName: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      eventDate: {
        type: DataTypes.DATE
      },
      eventPlace: {
        type: DataTypes.STRING
      },
      registrationFee: {
        type:  DataTypes.INTEGER
      },
      eventImage: {
        type:  DataTypes.ARRAY( DataTypes.STRING),
      }
     
    },
    {
      tableName: "events",
      timestamps: true, // Automatically adds createdAt and updatedAt columns
    }
  );
  return Event;
};
