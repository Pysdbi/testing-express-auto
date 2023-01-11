import passport from "passport"
import bluebird from "bluebird"

import { UserModel, UserRole } from "../models/user.model"

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info
  const logIn = bluebird.promisify(req.logIn)

  try {
    if (error || !user) return res.sendStatus(403)
    await logIn(user, { session: false })
  }
  catch (e) {
    return next(res.sendStatus(403))
  }

  if (!roles.includes(user.role)) {
    return next(res.sendStatus(403))
  }
  // eslint-disable-next-line require-atomic-updates
  req.user = user
  return next()
}

// @ts-ignore
export const authorize = (roles: UserRole[] = UserModel.roles) => (req, res, next) =>
  passport.authenticate(
    "jwt",
    { session: false },
    handleJWT(req, res, next, roles),
  )(req, res, next)
