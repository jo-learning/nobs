const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Order = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    shipping_address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    transaction_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("telebirr", "CBE", "OtherBanks"),
      defaultValue: "telebirr",

    },
    order_number: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      unique: true
    }
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at", // Customize the createdAt field name
    updatedAt: "updated_at", // Customize the updatedAt field name
  }
);

// Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
module.exports = Order;
