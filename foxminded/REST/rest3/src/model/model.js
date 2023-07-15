const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic',
  MODERATOR: 'moderator',
};

const profileSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [ROLE.ADMIN, ROLE.BASIC, ROLE.MODERATOR],
      required: true,
    },
    nickName: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

profileSchema.plugin(softDelete, { deletedAt: true });
const model = mongoose.model('userProfiles', profileSchema);
module.exports = { ROLE, model };
