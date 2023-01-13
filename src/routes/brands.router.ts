import { Router } from "express"
import { createBrand, deleteBrandById, getBrandById, getBrandsList } from "../controllers/brand.controller"
import { authorize } from "../middlewares/auth.middleware"

const router = Router()

router
  .route("/")
  /**
   * @api {get} api/brands
   * @apiDescription Get all Brands
   * @apiName Brands List
   * @apiGroup Brands
   *
   * @apiQueryParam {String}  sort   Sorting list [asc | desc]
   */
  .get(authorize(), getBrandsList)

  /**
   * @api {post} api/brands
   * @apiDescription Create new Brand
   * @apiName Create Brand
   * @apiGroup Brands
   *
   * @apiParam {String}  name   Brand name
   */
  .post(authorize(), createBrand)

router
  .route("/:id")
  /**
   * @api {get} api/brands/:id
   * @apiDescription Get Brand by id
   * @apiName Get Brand by id
   * @apiGroup Brands
   *
   * @apiParam {String}  id   Brand id
   */
  .get(authorize(), getBrandById)

  /**
   * @api {delete} api/brands/:id
   * @apiDescription Delete Brand by id
   * @apiName Delete Brand
   * @apiGroup Brands
   *
   * @apiParam {String}  id   Brand id
   */
  .delete(authorize(), deleteBrandById)

export default router
