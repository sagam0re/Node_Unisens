const { Router } = require('express');
const UserService = require('../service/user-service');
const auth = require('../middleware/basic-auth');
const pagination = require('../middleware/pagination');
const model = require('../mongooseDB/user-profile.schema.js');
const Logger = require('../logger/logger');
const CustomError = require('../errors/error');

const log = new Logger();
const router = Router();
const userService = new UserService();

//  SIGNUP ROUTER

router.post('/signup', async (req, res) => {
  try {
    const { nickName, password, fullName } = req.body;
    await userService.register(nickName, password, fullName);

    res.status(201).json({ message: 'User has been created' });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).send({ message: err.message });
    } else {
      res.status(500).send({ message: 'Something went wrong, sorry' });
    }
  }
});

//  LOGIN ROUTER

router.post('/login', async (req, res) => {
  try {
    const { nickName, password } = req.body;
    const logedInUser = await userService.login(nickName, password);

    res.status(200).json({ message: 'User has been logedin' });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).send({ message: err.message });
    } else {
      res.status(500).send({ message: 'Something went wrong, sorry' });
    }
  }
});

//  UPDATE ROUTER

router.put('/update', auth, async (req, res) => {
  try {
    const { nickName, password, fullName } = req.body;
    const userSalt = res.userSalt;

    const updatedUser = await userService.update(
      userSalt,
      nickName,
      password,
      fullName
    );

    res.status(200).json({ message: 'User has been updated' });
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).send({ message: err.message });
    } else {
      res.status(500).send({ message: 'Something went wrong, sorry' });
    }
  }
});

// USERS ROUTER

router.get('/users', pagination(model), (req, res) => {
  log.info('Users profiles are requested');
  res.json(res.paginatedResults);
});

module.exports = router;
