import { Strategy as LocaleStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const localeStrategy = new LocaleStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const userDoc = await User.findOne({ email });

      if (!userDoc) {
        return done(null, false, {
          message: "User with this email does not exist!",
        });
      }

      const isValidPassword = await bcrypt.compare(password, userDoc?.password);

      if (!isValidPassword) {
        return done(null, false, {
          message: "Incorrect password or email!",
        });
      }

      const user = userDoc.toObject();

      delete user.password;

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
