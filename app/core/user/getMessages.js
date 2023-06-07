const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

const models = db.getModels();

async function getMessages(user) {
  try {
    const messages = await models.Message.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        receiverName: user.username
      },
      include: [
        {
          model: models.User,
          as: 'sender',
        },
      ]
    });

    let messagesArray = [];
    for (let i = 0; i < messages.length; i++) {
      let messageObj = messages[i].toJSON();
      messageObj.sender = messages[i].sender.username;
      messagesArray.push(messageObj);
    }
    return messagesArray;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getMessages;

