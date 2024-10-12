const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_tg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_tg: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    color: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      references: {
        model: Category,
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
module.exports = Product;
