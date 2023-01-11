import { model, Schema } from "mongoose"
import { fieldCannotBeBlank } from "../utils"

/**
 * Schema
 */

export const BrandSchema = new Schema({
  // Название
  name: String,
}, { id: false })

BrandSchema.set("toObject", { virtuals: true, versionKey: false })
BrandSchema.set("toJSON", { virtuals: true, versionKey: false })

/**
 * Validations
 */

BrandSchema.path("name")
  .required(true, fieldCannotBeBlank("name"))
  .unique(true)

export const BrandModel = model("Brand", BrandSchema)
