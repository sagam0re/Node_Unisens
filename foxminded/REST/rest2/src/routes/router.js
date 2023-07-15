const { Router } = require('express');
const auth = require('../middleware/basic-auth');
const pagination = require('../middleware/pagination');
const UserProfile = require('../mongooseDB/user-profile.schema.js');
const UserController = require('../controller/user-controller');

const router = Router();
const userController = new UserController();

//  SIGNUP ROUTER

router.post('/signup', async (req, res) => {
  const { nickName, password, fullName } = req.body;
  const { message, code } = await userController.create(
    nickName,
    password,
    fullName
  );

  res.status(code).json({ message: message });
});

//  LOGIN ROUTER

router.post('/login', async (req, res) => {
  const { nickName, password } = req.body;
  const { message, code } = await userController.login(nickName, password);

  res.status(code).json({ message: message });
});

//  UPDATE ROUTER

router.put('/update', auth, async (req, res) => {
  const { nickName, password, fullName } = req.body;
  const unModifiedSince = req.headers['if-unmodified-since'];
  const { salt, updatedAt } = res.userProf;

  const { message, code } = await userController.update(
    unModifiedSince,
    salt,
    nickName,
    password,
    fullName
  );

  res.header('Last-Modified', updatedAt);
  res.status(code).json({ message: message });
});

// USERS ROUTER

router.get('/users', pagination(UserProfile), (req, res) => {
  res.json(res.paginatedResults);
});

// DELETE ROUTER

router.delete('/delete/:nickName', async (req, res) => {
  const { nickName } = req.params;
  const { message, code } = await userController.delete(nickName);

  res.status(code).json({ message: message });
});

module.exports = router;
