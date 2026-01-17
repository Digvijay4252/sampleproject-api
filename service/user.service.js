const logger = require("../common/logger");
const { User } = require("../db");

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    logger.error(
      `[ERROR] WHILE CREATING NEW USER ---> ${JSON.stringify(error)}` 
    );
    throw error;
  }
};


const getAccessToken = async (userId) => {
  try {
    const query = await User.findOne({
      where: {
        user_id: userId,
      },
    });
    console.log("Query at get Access Token", query);
    return query;
  } catch (error) {
    logger.error(
      `[ERROR] WHILE FETCHING ACCESS TOKENS ---> ${JSON.stringify(error)}`
    );
    throw error;
  }
};

module.exports = createUser;
// Also export as object for flexibility
module.exports.userServices = { createUser, getAccessToken };