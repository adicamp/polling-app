const Sequelize = require("sequelize");
const config = require("../config");

const connection = new Sequelize(
  config.dbConfig.DEVELOPMENT.DB_NAME,
  config.dbConfig.DEVELOPMENT.DB_USER,
  config.dbConfig.DEVELOPMENT.DB_PASS,
  {
    host: config.dbConfig.DEVELOPMENT.DB_HOST,
    port: config.dbConfig.DEVELOPMENT.DB_PORT,
    dialect: config.dbConfig.DEVELOPMENT.DIALECT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

const User = require("./User")(connection);
const Poll = require("./Poll")(connection);
const PollOption = require("./PollOption")(connection);
const PollVote = require("./PollVote")(connection);

Poll.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Poll, { foreignKey: "user_id" });

Poll.hasMany(PollOption, { foreignKey: "poll_id", onDelete: "CASCADE" });
PollOption.belongsTo(Poll, { foreignKey: "poll_id", onDelete: "CASCADE" });

PollVote.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(PollVote, { foreignKey: "user_id" });

PollVote.belongsTo(PollOption, { foreignKey: "option_id" });
PollOption.hasMany(PollVote, { foreignKey: "option_id" });

connection
  .authenticate()
  .then(() => console.log("Database connection established"))
  .catch((err) => console.error("Connection Disrupted.", err));

connection
  .sync({ alter: true })
  .then(() => console.log("All models were synchronized successfully."))
  .catch((err) => console.error("Failed to sync models:", err));

module.exports = {
  User,
  Poll,
  PollOption,
  PollVote,
};
