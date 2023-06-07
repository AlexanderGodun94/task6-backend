const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');
const reqAuth = require('../middlewares/reqAuth');
const reqUser = require('../middlewares/reqUser');

const createOrGetUser = require('../core/user/createOrGetUser');
const getExistUsers = require('../core/user/getExistUsers');
const createMessage = require('../core/user/createMessage');
const getMessages = require('../core/user/getMessages');

module.exports = function () {

  const app = this.app;

  app.route('/api/v1/user')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, req.user);
    })
    .post((req, res) => {
      if (!req.body.username)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createOrGetUser(req.body.username));
    });

  app.route('/api/v1/user/users')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, getExistUsers(req.user));
    });

  app.route('/api/v1/user/messages')
    .post(reqAuth, reqUser,(req, res) => {
      if (!req.body.message || !req.body.title || !req.body.receiverName)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createMessage(req.user, req.body.message, req.body.title, req.body.receiverName));
    });

  app.route('/api/v1/user/messages')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, getMessages(req.user));
    });


};

