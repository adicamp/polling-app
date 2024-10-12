const dataTypes = require("sequelize");

let PollOption;

module.exports = function (connection) {
  PollOption = connection.define(
    "PollOption",
    {
      option_id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      option_text: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      poll_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "poll_option",
      timestamps: false,
    }
  );

  return PollOption;
};
