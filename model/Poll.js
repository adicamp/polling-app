const dataTypes = require("sequelize");

let Poll;

module.exports = function (connection) {
  Poll = connection.define(
    "poll",
    {
      poll_id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      poll_question: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      poll_link: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "polls",
      timestamps: false,
    }
  );

  return Poll;
};
