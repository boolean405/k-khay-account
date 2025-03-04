import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    picture: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate the username
UserSchema.pre("save", function (next) {
  this.name = this.name.trim();
  if (!this.username) {
    const randomNumber = Math.floor(Math.random() * 1000);
    this.username = `${this.name.replace(/\s+/g, '').trim()}${randomNumber}`.toLowerCase();
  }
  next();
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
