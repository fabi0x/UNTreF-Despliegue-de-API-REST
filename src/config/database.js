const { Sequelize } = require('sequelize')
// process.loadEnvFile()
const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV
dotenv.config({ path: `.env.${ENV}` })

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
)

module.exports = sequelize
