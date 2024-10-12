const DB_CONSTANTS = {
  DEVELOPMENT: {
    DB_PORT: 3306,
    DIALECT: "mysql",
    DB_NAME: "poll_db",
    DB_PASS: "",
    DB_USER: "root",
    DB_HOST: "localhost",
  },
  PRODUCTION: {
    DB_PORT: 3306,
    DIALECT: "mysql",
  },
};

module.exports = DB_CONSTANTS;
