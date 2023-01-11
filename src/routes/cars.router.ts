import { Router } from "express"

import {
  createCar,
  deleteCarById,
  getCarById,
  getCarsList,
  updateCarById,
} from "../controllers/car.controller"
import { authorize } from "../middlewares/auth.middleware"

const router = Router()

router
  .route("/")
  /**
   * @api {get} api/cars
   * @apiDescription Get all Cars
   * @apiName Cars list
   * @apiGroup Cars
   */
  .get(authorize(), getCarsList)

  /**
   * @api {post} api/brands/:id
   * @apiDescription Create new Car
   * @apiName Create Car
   * @apiGroup Cars
   *
   * @apiParam {String}  brandId          Brand id
   * @apiParam {String}  name             Car name
   * @apiParam {Number}  yearProduction   Year of production car
   * @apiParam {Number}  price            Car price
   */
  .post(createCar)

router
  .route("/:id")
  /**
   * @api {get} api/cars/:id
   * @apiDescription Get Car by id
   * @apiName Get Car by id
   * @apiGroup Cars
   */
  .get(getCarById)

  /**
   * @api {get} api/cars/:id
   * @apiDescription Delete Car by id
   * @apiName Delete Car
   * @apiGroup Cars
   *
   * @apiParam {String}  id   Car id
   */
  .delete(deleteCarById)

  /**
   * @api {get} api/cars/:id
   * @apiDescription Update Car by id
   * @apiName Update Car
   * @apiGroup Cars
   *
   * @apiParam {String}  brandId          Brand id
   * @apiParam {String}  name             Car name
   * @apiParam {Number}  yearProduction   Year of production car
   * @apiParam {Number}  price            Car price
   */
  .put(updateCarById)

export default router
