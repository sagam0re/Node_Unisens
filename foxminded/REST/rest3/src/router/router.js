const { model } = require('../model/model');
const UserController = require('../controller/user-controller');
const jwtMiddleware = require('../middlewares/jwtoken');
const pagination = require('../middlewares/pagination');

const controller = new UserController();
const signupController = controller.signup;
const loginController = controller.login;
const updateController = controller.update;
const deleteController = controller.delete;
const getUserController = controller.getUser;

exports.router = function (app) {
  app.post('/signup', signupController);
  app.post('/login', loginController);
  app.put('/update', jwtMiddleware, updateController);
  app.delete('/delete/:nickName', jwtMiddleware, deleteController);
  app.get('/users', pagination(model), getUserController);
};
