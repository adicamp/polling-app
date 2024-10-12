const { Op } = require("sequelize");
const { User } = require("../model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const config = require("../config");

async function fetchUsers() {
  console.log("Inside utils::userUtil.js::fetchUsers");

  let listUsers = {};
  try {
    listUsers = await User.findAll({
      attributes: ["first_name", "last_name"],
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  return { listUsers: listUsers };
}

async function fetchUserById(id) {
  console.log("Inside utils::userUtil.js::fetchUserById");

  let user = {};
  try {
    user = await User.findByPk(id, {
      attributes: ["first_name", "last_name"],
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  return { user: user };
}

async function registerUser(firstNameP, lastNameP, passwordP, emailP) {
  console.log("Inside utils::userUtil.js::registerUser");

  let result = {};
  try {
    let regUser = await User.build({
      first_name: firstNameP,
      last_name: lastNameP,
      password: passwordP,
      email: emailP,
    }).save();

    result = regUser.toJSON();
  } catch (err) {
    console.error(err + "Inside utils::userUtil.js");
    throw err;
  }
  return { result };
}

async function loginUser(emailP, passwordP) {
  console.log("Inside utils::userUtil.js::loginUser");

  try {
    const user = await User.findOne({ where: { email: emailP } });
    if (!user || !bcrypt.compare(passwordP, user.password)) {
      return { error: "Invalid credentials" };
    }
    const token = JWT.sign(
      {
        id: user.user_id,
        email: user.email,
      },
      config.appConfig.SECRET
    );
    return { token };
  } catch (err) {
    console.error(err + "Inside utils::userUtil.js");
    throw err;
  }
}

async function findUsers(firstNameP, emailP) {
  console.log("Inside utils::userUtil.js::fetchUsers");
  let listUsers = {};
  try {
    const condition = {
      first_name: {
        [Op.like]: firstNameP,
      },
    };
    if (emailP) {
      condition.email = emailP;
    }
    listUsers = await User.findAll({
      attributes: ["first_name", "last_name", "email"],
      where: condition,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { listUsers: listUsers };
}

module.exports = {
  fetchUsers: fetchUsers,
  registerUser: registerUser,
  findUsers: findUsers,
  fetchUserById: fetchUserById,
  loginUser: loginUser,
};
