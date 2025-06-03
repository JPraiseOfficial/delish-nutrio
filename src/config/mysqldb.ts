import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

let databaseName = process.env.DB_NAME
let username = process.env.DB_USER
let password = process.env.DB_PASS

const mysqldb = new Sequelize(databaseName, username, password, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

export const connectMySQL = async () => {
  try {
    await mysqldb.authenticate();
    console.log('Connection has been established successfully.');
    await mysqldb.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default mysqldb