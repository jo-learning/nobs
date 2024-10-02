const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Nobs', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb', // or 'mariadb'
});



module.exports = sequelize;
