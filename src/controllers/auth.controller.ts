import { RequestHandler } from "express"
import jsonwebtoken from "jsonwebtoken"
import { UserModel } from "../models/user.model"
// @ts-ignore
import uuidv1 from "uuidv1"
import dotenv from "dotenv"

dotenv.config()

export const register: RequestHandler = async (req, res) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    const user = new UserModel(body)
    const savedUser = await user.save()
    res.status(201)
    res.send(savedUser.transform())
  }
  catch (error) {
    // @ts-ignore
    return res.sendStatus(UserModel.checkDuplicateLoginError(error?.error?.code ?? 400))
  }
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    // @ts-ignore
    const user = await UserModel.findAndGenerateToken(req.body)
    if (user?.error?.code) res.sendStatus(user.error.code)
    const payload = { sub: user.id }
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET)
    return res.json({ message: "OK", token })
  }
  catch (error) {
    next(error)
  }
}

export const confirm: RequestHandler = async (req, res) => {
  return res.json({ message: "OK" })
}
