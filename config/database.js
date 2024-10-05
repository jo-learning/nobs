const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.NOBS_DB, process.env.NOBS_USERNAME, process.env.NOBS_PASSWORD, {
    host: process.env.NOBS_HOST,
    dialect: 'mariadb', // or 'mariadb'
});


module.exports = sequelize;
