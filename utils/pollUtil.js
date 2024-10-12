const { Poll, PollOption } = require("../model");

async function addPoll(pollQuestion, pollLink, userId, optionTExt) {
  console.log("Inside utils::pollUtil.js::addPoll");
  let pollAdded = {};
  try {
    let optArray = optionTExt.split(",");

    pollAdded = await Poll.create({
      poll_question: pollQuestion,
      poll_link: pollLink,
      user_id: userId,
    });

    for (let i = 0; i < optArray.length; i++) {
      pollOption = await PollOption.build({
        option_text: optArray[i],
        poll_id: pollAdded.poll_id,
      }).save();
    }

    await PollOption.sync();
    await Poll.sync();
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { success: true, pollAdded: pollAdded };
}

async function deletePoll(id) {
  try {
    let n = await Poll.destroy({
      where: { poll_id: id },
    });
    console.log(`number of deleted rows: ${n}`);
    return { deletedRows: n };
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { deletedRows: null };
}

module.exports = {
  addPoll,
  deletePoll,
};
