const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

const profileSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model('userProfiles', profileSchema);
