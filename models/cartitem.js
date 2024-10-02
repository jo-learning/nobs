const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Product = require("./product");
const ShoppingCart = require("./shoppingcart");

const CartItem = sequelize.define(
  "cart_items",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.STRING,
      references: {
        model: ShoppingCart,
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    product_id: {
      type: DataTypes.STRING,
      references: {
        model: Product,
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    underscored: false,
  }
);
module.exports = CartItem;
