const gravatar = require("gravatar");
const { Schema, model } = require("mongoose");
const { v4 } = require("uuid");

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
      required: [true, "Verify token is required"],
    },
  },
  { timestamps: true }
);

const User = model("user", schema);

module.exports = User;
