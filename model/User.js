const dataTypes = require("sequelize");
const bcrypt = require("bcrypt");

let User;

module.exports = function (connection) {
  User = connection.define(
    "user",
    {
      user_id: {
        primaryKey: true,
        allowNull: false,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      first_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password =
              user.password && user.password != ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
            console.log("Before Creating The User");
          }
        },
      },
    }
  );

  return User;
};
