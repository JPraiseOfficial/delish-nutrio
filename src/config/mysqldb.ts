import { Sequelize } from "sequelize";
import { env } from "./env.js";

let databaseName = env.mysqldb.name
let username = env.mysqldb.user
let password = env.mysqldb.password

const mysqldb = new Sequelize(databaseName, username, password, {
  host: env.mysqldb.host,
  port: env.mysqldb.port,
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