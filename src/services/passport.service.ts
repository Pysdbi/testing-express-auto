import { ExtractJwt, Strategy } from "passport-jwt"
import dotenv from "dotenv"
import { UserModel } from "../models/user.model"

dotenv.config()

export const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

export const jwt = new Strategy(jwtOptions, async (jwtPayload, done) => {
  void UserModel.findById(jwtPayload.sub, (err, user) => {
    // @ts-ignore
    if (err) return done(err, null)
    if (user) return done(null, user)
    return done(null, false)
  })
})
