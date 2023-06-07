const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

async function createMessage(user, message, title, receiverName) {
  try {
    const models = db.getModels();
    return await models.Message.create({
      receiverName: receiverName,
      senderId: user.id,
      title: title,
      message: message,
    });
  } catch (err) {

    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createMessage;

