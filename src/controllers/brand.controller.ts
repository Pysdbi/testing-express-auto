import { RequestHandler } from "express"
import { BrandModel } from "../models/brand.model"

export const getBrandsList: RequestHandler = async (req, res) => {
  const sort = req.query.sort as "asc" | "desc" ?? "asc"
  const brands = await BrandModel
    .find({})
    .sort({ name: sort === "asc" ? 1 : -1 })
  res.send(brands)
}

export const getBrandById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const brand = await BrandModel.findById(id)
  if (brand) res.send(brand)
  else res.sendStatus(404)
}

export const createBrand: RequestHandler = async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const brand = new BrandModel(req.body)
  const brandValidate = brand.validateSync()
  if (brandValidate) res.send(brandValidate.message)
  else {
    await brand.save()
    res.send(brand)
  }
}

export const deleteBrandById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const brand = await BrandModel.findByIdAndDelete(id)
  if (brand) res.send(brand)
  else res.sendStatus(404)
}
