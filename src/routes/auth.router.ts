import { Router } from "express"

import * as authController from "../controllers/auth.controller"
import validator from "express-validation"
import { create } from "../validations/user.validation"

const router = Router()

router
  .route("/register")
  /**
   * @api {get} api/auth/register
   * @apiDescription Registration user
   * @apiName Auth Register
   * @apiGroup Auth
   */
  .post(validator(create), authController.register)

router
  .route("/login")
  /**
   * @api {get} api/auth/login
   * @apiDescription Login user
   * @apiName Auth Login
   * @apiGroup Auth
   */
  .post(authController.login)

router
  .route("/confirm")
  /**
   * @api {get} api/auth/confirm
   * @apiDescription Confirm JWT token
   * @apiName Auth Confirm
   * @apiGroup Auth
   */
  .get(authController.confirm)

export default router
