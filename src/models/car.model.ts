import { model, Schema } from "mongoose"
import { fieldCannotBeBlank } from "../utils"

/**
 * Schema
 */

export const CarSchema = new Schema({
  // Бренд
  brandId: { type: Schema.Types.ObjectId, ref: "brand" },
  // Название
  name: String,
  // Год производства
  yearProduction: Number,
  // Цена
  price: Number,
}, { id: false })

CarSchema.set("toObject", { virtuals: true, versionKey: false })
CarSchema.set("toJSON", { virtuals: true, versionKey: false })

CarSchema.pre(/^find/, function (next) {
  void this.populate("brand")
  next()
})

/**
 * Virtual`s
 */
CarSchema.virtual("brand", {
  ref: "Brand",
  localField: "brandId",
  foreignField: "_id",
  justOne: true,
})

/**
 * Validations
 */
CarSchema.path("brandId")
  .required(true, fieldCannotBeBlank("brandId"))
CarSchema.path("name")
  .required(true, fieldCannotBeBlank("name"))
CarSchema.path("yearProduction")
  .required(true, fieldCannotBeBlank("yearProduction"))
CarSchema.path("price")
  .required(true, fieldCannotBeBlank("price"))

export const CarModel = model("Car", CarSchema)
