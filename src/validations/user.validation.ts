import Joi from "joi"

export const create = {
  body: {
    login: Joi.string().required(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().max(128).required(),
  },
}
