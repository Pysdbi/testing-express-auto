import { CarModel } from "../models/car.model"
import { RequestHandler } from "express"
import { BrandModel } from "../models/brand.model"

export const getCarsList: RequestHandler = async (req, res) => {
  const cars = await CarModel.find({})
  res.send(cars)
}

export const getCarById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const car = await CarModel.findById(id)
  if (car) res.send(car)
  else res.sendStatus(404)
}

export const createCar: RequestHandler = async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const { brandId } = req.body
  const brand = await BrandModel.findById(brandId)
  if (!brand) return res.sendStatus(400)

  const car = new CarModel({ ...req.body })
  const carValidate = car.validateSync()
  if (carValidate) res.send(carValidate.message)
  else {
    await car.save()
    res.send(car)
  }
}

export const deleteCarById: RequestHandler = async (req, res) => {
  const id = req.params.id
  const car = await CarModel.findByIdAndDelete(id)
  if (car) res.send(car)
  else res.sendStatus(404)
}

export const updateCarById: RequestHandler = async (req, res) => {
  if (!req.body) return res.sendStatus(400)
  const id = req.body.id
  const newCar = { ...req.body }
  const car = await CarModel.findOneAndUpdate({ _id: id }, newCar, { new: true })
  if (car) res.send(car)
  else res.sendStatus(404)
}
