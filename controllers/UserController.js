let utils = require("../utils");

async function fetchUsers() {
  console.log("Inside controllers::userController.js::fetchUsers");

  let users = {};
  users = await utils.userUtil
    .fetchUsers()
    .then(function (users) {
      return users;
    })
    .catch((err) => {
      console.log("Ouch", err);
    });

  return users;
}

async function fetchUserById(id) {
  console.log("Inside controllers::userController.js::fetchUserById");

  let response = {};
  response = await utils.userUtil
    .fetchUserById(id)
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      console.log("Ouch", err);
    });

  return { response };
}

async function registerUser(firstNameP, lastNameP, passwordP, emailP) {
  console.log("Inside controllers::userController.js::registerUser");
  let response = {};
  try {
    response = await utils.userUtil.registerUser(
      firstNameP,
      lastNameP,
      passwordP,
      emailP
    );
  } catch (err) {
    console.error("Inside Controller Reg Err", err);
    response = err.errors;
    throw err;
  }
  return { response };
}

async function findUsers(firstNameP, emailP) {
  console.log("Inside controllers::userController.js::findUsers");

  let response = {};
  try {
    response = await utils.userUtil.findUsers(firstNameP, emailP);
  } catch (err) {
    console.error("Inside Controller findUser", err);
    response = err.errors;
    throw err;
  }
  return { response };
}

async function loginUser(emailP, passwordP) {
  console.log("Inside controllers::userController.js::findUsers");

  let response = {};
  try {
    response = await utils.userUtil.loginUser(emailP, passwordP);
  } catch (err) {
    console.error("Inside Controller login", err);
    response = err.errors;
    throw err;
  }
  return { response };
}

module.exports = {
  fetchUsers: fetchUsers,
  registerUser: registerUser,
  findUsers: findUsers,
  fetchUserById: fetchUserById,
  loginUser: loginUser,
};
