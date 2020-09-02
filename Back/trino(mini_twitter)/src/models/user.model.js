const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [(email) => isEmail(email), "correo invalido"],
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
});

module.exports = model("User", userSchema);
