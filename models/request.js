const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const Category = require("./category");
const User = require("./user")

const Request = sequelize.define(
  "requests",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    about: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at", // Customize the createdAt field name
    updatedAt: "updated_at", // Customize the updatedAt field name
  }
);


// Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });
module.exports = Request;
