"use strict";

const config = require("./config");
const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const validate = require("./auth");
const hapiAuthJWT = require("hapi-auth-jwt2");

const start = async () => {
  const server = Hapi.server({
    port: config.appConfig.DEVELOPMENT.APP_PORT,
    host: config.appConfig.DEVELOPMENT.APP_HOST,
  });

  await server.register(hapiAuthJWT);
  server.auth.strategy("simple", "jwt", {
    key: config.appConfig.SECRET,
    validate,
    verifyOptions: { ignoreExpiration: true },
  });
  server.auth.default("simple");
  server.route(routes);
  await server.start();

  return server;
};

start()
  .then((server) => console.log(`Server running at: ${server.info.uri}`))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
