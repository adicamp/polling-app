const { User } = require("../model");

async function validate(decoded, request, h) {
  try {
    const user = await User.findByPk(decoded.id);
    if (user) {
      return { isValid: true };
    }

    return { isValid: false };
  } catch (err) {
    console.error(err);
    return { err };
  }
}

module.exports = validate;
