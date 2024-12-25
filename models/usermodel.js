import mongoose from "mongoose";
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// make it more strong
// 1. name is required
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
      lowercase: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      minlength: 10,
    },
    gender: {
      type: String,
      enum: ["male", "Male", "Female", "female", "other", "Other"],
      validate: {
        validator: (value) => {
          return (
            value === "male" ||
            value === "Male" ||
            value === "Female" ||
            value === "female" ||
            value === "other" ||
            value == "Other"
          );
        },
        message: "Gender must be either male, female, or other",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    age: {
      type: Number,
      min: 15,
      max: 90,
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  return await jwt.sign({ email: user.email }, "secretkey", {
    expiresIn: "1h",
  });
};

userSchema.methods.validatePassword = async function (passwordInputbyUser) {
  return await bcrypt.compare(passwordInputbyUser, this.password);
};

const User = model("User", userSchema);

export default User;
