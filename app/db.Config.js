module.exports = {
  host: "localhost",
  user: "postgres",
  password: "MTX$2021",
  database: "crud",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
