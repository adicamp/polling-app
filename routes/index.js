const Joi = require("joi");
let controllers = require("../controllers");

module.exports = [
  {
    method: "GET",
    path: "/getUsers",
    handler: async function (request, h) {
      try {
        let allUsers = await controllers.userController.fetchUsers();
        console.log("success");
        return allUsers;
      } catch (err) {
        throw err;
      }
    },
  },
  {
    method: "POST",
    path: "/users/create",
    config: {
      description: "Register users",
      tags: ["api", "users"],
      validate: {
        payload: Joi.object({
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string().email({ multiple: true }).required(),
          password: Joi.string().required(),
        }),
      },
    },
    handler: async function (request, h) {
      let registerUser = {};
      try {
        registerUser = await controllers.userController
          .registerUser(
            request.payload.firstName,
            request.payload.lastName,
            request.payload.password,
            request.payload.email
          )
          .then(function (registerUser) {
            return registerUser;
          })
          .catch((err) => {
            console.log("Throw Err From Handler");
            throw err;
          });
      } catch (err) {
        console.error("Ouch in Handler", err);
        return { response: err.errors };
      }
      return registerUser;
    },
  },
  {
    method: "GET",
    path: "/findUsers/{name}/{email?}",
    handler: async function (request, h) {
      try {
        let allUsers = await controllers.userController.findUsers(
          request.params.name,
          request.params.email
        );
        return allUsers;
      } catch (err) {
        throw err;
      }
    },
  },
  {
    method: "GET",
    path: "/findUsersById/{id}",
    handler: async function (request, h) {
      try {
        let user = await controllers.userController.fetchUserById(
          request.params.id
        );
        return user;
      } catch (err) {
        throw err;
      }
    },
  },
  {
    method: "POST",
    path: "/login",
    config: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email({ multiple: true }).required(),
          password: Joi.string().required(),
        }),
      },
      auth: false,
    },
    handler: async function (request, h) {
      let loginUser = {};
      try {
        loginUser = await controllers.userController
          .loginUser(request.payload.email, request.payload.password)
          .then((loginUser) => {
            return loginUser;
          })
          .catch((err) => err);
      } catch (err) {
        console.error(err);
        throw err;
      }

      return loginUser;
    },
  },
  {
    method: "POST",
    path: "/poll",
    config: {
      tags: ["api", "poll"],
      validate: {
        payload: Joi.object({
          pollQuestion: Joi.string().required(),
          pollLink: Joi.string().required(),
          optionTExt: Joi.string().required(),
        }),
      },
    },
    handler: async function (request, h) {
      const userId = request.auth.credentials.id;
      let pollAdded = {};
      try {
        pollAdded = await controllers.pollController
          .addPoll(
            request.payload.pollQuestion,
            request.payload.pollLink,
            userId,
            request.payload.optionTExt
          )
          .then(function (pollAdded) {
            return pollAdded;
          })
          .catch((err) => {
            console.log("Throw Err From Handler");
            throw err;
          });
      } catch (err) {
        console.error("Ouch in Handler", err);
        return { response: err.errors };
      }
      return pollAdded;
    },
  },
  {
    method: "DELETE",
    path: "/poll/{id}",
    config: {
      tags: ["api", "poll"],
    },
    handler: async function (request, h) {
      let pollDeleted = {};
      try {
        pollDeleted = await controllers.pollController
          .deletePoll(request.params.id)
          .then(function (pollDeleted) {
            return pollDeleted;
          })
          .catch((err) => {
            console.log("Throw Err From Handler");
            throw err;
          });
      } catch (err) {
        console.error("Ouch in Handler", err);
        return { response: err.errors };
      }
      return pollDeleted;
    },
  },
];
