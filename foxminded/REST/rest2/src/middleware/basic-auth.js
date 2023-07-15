const UserService = require('../service/user-service');
const Logger = require('../logger/logger');
const CustomError = require('../errors/error');

const log = new Logger();
const userService = new UserService();

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    log.warn('Authentication is forbidden');
    return res.json({ message: 'Authentication is forbidden' });
  }
  const encoded = auth.substring(6);
  const decoded = Buffer.from(encoded, 'base64').toString('ascii');
  const [nickName, password] = decoded.split(':');

  try {
    const { updatedAt, salt } = await userService.login(nickName, password);

    res.userProf = { salt, updatedAt };
    next();
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
  }
}

module.exports = authMiddleware;
