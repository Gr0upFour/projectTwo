const Sequelize = require('sequelize');
require('dotenv').config();


//Create a .env file in root directory with the following names, filling in the placeholders between the '' with the necessary information
//user account and password are the ones used to access installed mysql CLI
//DB_NAME = 'database_name'
//DB_USER = 'user_account_name'
//DB_PW = 'user_account_password'
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {   
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    });
}
module.exports = sequelize;