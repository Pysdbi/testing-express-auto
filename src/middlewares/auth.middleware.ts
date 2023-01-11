import passport from "passport"
import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken"

import { UserModel, UserRole } from "../models/user.model"

dotenv.config()

const handleJWT = (req, res, next, roles) => async () => {
  try {
    // TODO Validate role
    const verify = jsonwebtoken.verify(req.headers.authorization.slice(7), process.env.JWT_SECRET)
    if (!verify) return res.sendStatus(403)
    return next()
  }
  catch (ex) {
    return res.sendStatus(403)
  }
}

// @ts-ignore
export const authorize = (roles: UserRole[] = UserModel.roles) => (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    handleJWT(req, res, next, roles),
  )(req, res, next)
