const UserService = require('../service/user-service');
const CustomError = require('../errors/error');
const Logger = require('../logger/logger');

const log = new Logger();
const userService = new UserService();

class UserController {
  constructor() {
    this.messages = {
      err: 'Oops! Something went wrong.',
      okCode: 200,
      errCode: 500,
      deleteCode: 204,
      createOkMsg: 'New user has been registered.',
      loginOkMsg: 'User has been logged in successfuly',
      updateOkMsg: 'User profile has been updated successfuly',
      deleteOkMsg: 'User has been deleted',
    };
  }
  async create(nickName, password, fullName, req) {
    try {
      await userService.register(nickName, password, fullName);
      const code = this.messages.okCode;
      const message = this.messages.createOkMsg;
      log.info(message);
      return { message, code };
    } catch (err) {
      if (err instanceof CustomError) {
        const { message, code } = err;
        return { message, code };
      } else {
        const code = this.messages.errCode;
        const message = this.messages.err;
        return { message, code };
      }
    }
  }

  async login(nickName, password) {
    try {
      await userService.login(nickName, password);
      const code = this.messages.okCode;
      const message = this.messages.loginOkMsg;
      log.info(message);
      return { message, code };
    } catch (err) {
      if (err instanceof CustomError) {
        const { message, code } = err;
        return { message, code };
      } else {
        const code = this.messages.errCode;
        const message = this.messages.err;
        return { message, code };
      }
    }
  }

  async update(unModifiedSince, salt, newNickName, newPass, new_FName) {
    try {
      await userService.update(
        unModifiedSince,
        salt,
        newNickName,
        newPass,
        new_FName
      );
      const code = this.messages.okCode;
      const message = this.messages.updateOkMsg;
      log.info(message);
      return { message, code };
    } catch (err) {
      if (err instanceof CustomError) {
        const { message, code } = err;
        return { message, code };
      } else {
        const code = this.messages.errCode;
        const message = this.messages.err;
        return { message, code };
      }
    }
  }

  async delete(nickName) {
    try {
      await userService.delete(nickName);

      const code = this.messages.okCode;
      const message = this.messages.deleteOkMsg;
      log.info(this.messages.deleteOkMsg);
      return { message, code };
    } catch (err) {
      if (err instanceof CustomError) {
        const { message, code } = err;
        return { message, code };
      } else {
        const code = this.messages.errCode;
        const message = this.messages.err;
        return { message, code };
      }
    }
  }
}

module.exports = UserController;
