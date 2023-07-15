const UserProfile = require('../mongooseDB/user-profile.schema.js');
const { hashingPass } = require('../hash/hash');
const CustomError = require('../errors/error.js');

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
    const userProfile = await UserProfile.findOne({ nickName, deleted: false });

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

  async update(unModifiedSince, salt, newNickName, newPass, new_FName) {
    if (!newNickName || !newPass || !new_FName) {
      throw new CustomError('You need to fill all the fields', 400);
    }
    const { password, fullName, nickName, updatedAt } =
      await UserProfile.findOne({
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

    if (Date.parse(unModifiedSince) <= Date.parse(updatedAt)) {
      await UserProfile.updateOne(
        { salt },
        {
          nickName: newNickName,
          password: hashedPass,
          fullName: new_FName,
        }
      );
      return;
    }
    throw new CustomError('Not Modified', 304);
  }
  async delete(nickName) {
    const alreadyDeletedUser = await UserProfile.findOne({
      nickName,
      deleted: true,
    });

    if (alreadyDeletedUser) {
      throw new CustomError('User already has been deleted', 403);
    }

    const deletedUser = await UserProfile.delete({ nickName });

    if (deletedUser) {
      return await UserProfile.findOne({ nickName }).select([
        'nickName',
        'fullName',
        '-_id',
      ]);
    }
  }
}

module.exports = UserService;
