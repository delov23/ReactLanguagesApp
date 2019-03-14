const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  salt: {
    type: Schema.Types.String,
    required: true
  },
  courses: [
    { type: Schema.Types.ObjectId, ref: 'Course' }
  ],
  role: {
    type: String, default: 'User'
  }
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
})

let User =  mongoose.model('User', userSchema);

User.seedAdmin = async () => {
  try {
      let users = await User.find({});
      if (users.length > 0) {
          return;
      }
      const salt = encryption.generateSalt();
      const hashedPass = encryption.generateHashedPassword(salt, '123456');
      return User.create({
          username: 'delov23',
          salt,
          hashedPass,
          role: 'Admin',
          courses: [],
          firstName: 'Admin',
          lastName: 'Admin'
      });
  } catch (e) {
      console.error(e);
  }
};

module.exports = User;