const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const ShoppingCart = sequelize.define('shopping_carts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    
}, {
    timestamps: true,
    underscored: true,
    createdAt: "created_at", // Customize the createdAt field name
    updatedAt: "updated_at", // Customize the updatedAt field name
});
module.exports = ShoppingCart;
