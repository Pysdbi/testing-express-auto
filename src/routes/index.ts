import { Router } from "express"

import carsRoutes from "./cars.router"
import brandsRouter from "./brands.router"
import authRouter from "./auth.router"

const router = Router()

router.use("/auth", authRouter)
router.use("/cars", carsRoutes)
router.use("/brands", brandsRouter)

router.get("/",
  (req, res) => res.json({ msg: "Testing-express-auto" }),
)

export default router
