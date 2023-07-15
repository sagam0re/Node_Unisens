const UserProfile = require('../mongooseDB/user-profile.schema.js');
const { hashingPass } = require('../hash/hash');
const Logger = require('../logger/logger');
const CustomError = require('../errors/error.js');

const log = new Logger();

class UserService {
  constructor() {}

  async register(nickName, password, fullName) {
    const existedUser = await UserProfile.findOne({ nickName });

    if (!nickName || !password || !fullName) {
      throw new CustomError('Please, Fill all the fields', 404);
    }

    if (existedUser) {
      throw new CustomError('Nickname already exists', 400);
    }

    const { hashedPass, salt } = await hashingPass(password);

    const createdUser = await UserProfile.create({
      nickName,
      fullName,
      password: hashedPass,
      salt,
    });
    return createdUser;
  }

  async login(nickName, pass) {
    const userProfile = await UserProfile.findOne({ nickName });
    if (!userProfile) {
      throw new CustomError('User does not exist', 403);
    }
    const { salt, password } = userProfile;
    const { hashedPass } = await hashingPass(pass, salt);

    if (hashedPass !== password) {
      throw new CustomError('Wrong password', 404);
    }

    return userProfile;
  }

  async update(salt, newNickName, newPass, new_FName) {
    if (!newNickName || !newPass || !new_FName) {
      throw new CustomError('You need to fill all the fields', 400);
    }
    const { password, fullName, nickName } = await UserProfile.findOne({
      salt,
    });
    const { hashedPass } = await hashingPass(newPass, salt);
    if (
      password === hashedPass &&
      fullName === new_FName &&
      nickName === newNickName
    ) {
      throw new CustomError('Nothing has been changed', 400);
    }
    const updatedUser = await UserProfile.updateOne(
      { salt },
      {
        nickName: newNickName,
        password: hashedPass,
        fullName: new_FName,
      }
    );
    return updatedUser;
  }
}

module.exports = UserService;
