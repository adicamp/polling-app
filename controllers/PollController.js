const utils = require("../utils");

async function addPoll(pollQuestion, pollLink, userId, optionTExt) {
  console.log("Inside controllers::PollController.js::addPoll");
  let response = {};
  try {
    response = await utils.pollUtil.addPoll(
      pollQuestion,
      pollLink,
      userId,
      optionTExt
    );
  } catch (err) {
    console.error("Inside Controller addPoll Err", err);
    response = err.errors;
    throw err;
  }
  return { response };
}

async function deletePoll(id) {
  console.log("Inside controllers::PollController.js::deletePoll");
  let response = {};
  try {
    response = await utils.pollUtil.deletePoll(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { response };
}

module.exports = {
  addPoll,
  deletePoll,
};
