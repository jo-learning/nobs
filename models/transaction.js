const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");

const Transaction = sequelize.define(
  "transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    transaction_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    check: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'false'
    },
    payment_method: {
      type: DataTypes.ENUM("telebirr", "CBE", "OtherBanks"),
      defaultValue: "telebirr",

    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at", // Customize the createdAt field name
    updatedAt: "updated_at", // Customize the updatedAt field name
  }
);

// Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });
module.exports = Transaction;
