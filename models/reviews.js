const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reviews = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: true,
    underscored: true,
    createdAt: "created_at", // Customize the createdAt field name
    updatedAt: "updated_at", // Customize the updatedAt field name
});

Reviews.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'})
Reviews.belongsTo(Product, {foreignKey: 'productId', onDelete: 'CASCADE'})
module.exports = Reviews;
