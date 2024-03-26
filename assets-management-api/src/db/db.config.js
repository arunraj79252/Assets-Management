const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config()

//get database details form environment
const { DATABASE, DB_USER, PASSWORD, HOST, DB_PORT } = process.env;
console.log(DATABASE, DB_USER, PASSWORD, HOST, DB_PORT)
//connecting to a db
const sequelize = new Sequelize({
    dialect: 'mysql',
    database: DATABASE,
    username: DB_USER,
    password: PASSWORD,
    host: HOST,
    port: DB_PORT,
    timezone: '+05:30'
});

//testing connection
try {
    sequelize.authenticate();
    console.log('Database connection established')
} catch (error) {
    console.error('Unable to connect to db ', error);
}

module.exports = sequelize;