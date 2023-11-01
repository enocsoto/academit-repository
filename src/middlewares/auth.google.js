import { use } from "passport";
import localStrategy from "passport-local";
import "dotenv/config";
import { Auth } from "../infrastructure/model/index.js";

use(
  "auth",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await Auth.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

use("login", new localStrategy({
  usernameField: 'email',
  passwordField: 'password',

}, async (email, password, done) => {
  try {
    const user = await Auth.findOne({email});
    if(!user){
      return done(null, false, {message: `User not found`})
    }
    const validate = await user.validate(password);
    if(!validate) return done(null, false, {message: `Password incorrect`});
    return done(null, user, {message: `Login`})
  } catch (error) {
    return done(error)
  }
}
))