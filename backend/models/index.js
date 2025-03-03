const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};

db.sequelize = sequelize;
db.User = require("./user")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);
db.Cart = require("./cart")(sequelize, DataTypes);
db.Ticket = require("./ticket")(sequelize, DataTypes);
db.TicketRegistry = require("./ticket_registry")(sequelize, DataTypes);

// Define Relationships
db.User.hasMany(db.Cart, { foreignKey: "userId" });
db.Product.hasMany(db.Cart, { foreignKey: "productId" });
db.Cart.belongsTo(db.User, { foreignKey: "userId" });
db.Cart.belongsTo(db.Product, { foreignKey: "productId", as: "product" }); // ✅ Add alias "product"

db.TicketRegistry.belongsTo(db.Ticket, {
  foreignKey: "ticket_id",
  as: "ticket",
});

// A ticket registry belongs to a user
db.TicketRegistry.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});
db.Ticket.hasMany(db.TicketRegistry, {
  foreignKey: "ticket_id",
  as: "ticketRegistries", // Alias for the association
});
db.User.hasMany(db.TicketRegistry, {
  foreignKey: "user_id",
  as: "ticketRegistries", // Alias for the association
});

module.exports = db;
