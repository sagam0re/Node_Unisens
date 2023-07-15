const service = require('../service/user-service');
const Logger = require('../logger/logger');
const CustomError = require('../errors/error');

const log = new Logger();
const User = new service();

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
    const userProf = await User.login(nickName, password);
    res.userSalt = userProf.salt;
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.code).json({ message: err.message });
    }
  }

  next();
}

module.exports = authMiddleware;
