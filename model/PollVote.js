const dataTypes = require("sequelize");

let PollVote;

module.exports = function (connection) {
  PollVote = connection.define(
    "PollVote",
    {
      vote_id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      option_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "poll_vote",
      timestamps: false,
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ["user_id", "option_id"],
      //     name: "unique_user_option_vote",
      //   },
      //   {
      //     unique: true,
      //     fields: ["user_id", "poll_id"],
      //     name: "unique_user_poll_vote",
      //   },
      // ],
    }
  );

  return PollVote;
};
