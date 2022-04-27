module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USERNAME,
  PASSWORD: process.env.PSW,
  DB: process.env.DATABASE_POLYGON,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};