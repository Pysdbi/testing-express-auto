import { Model, model, Schema } from "mongoose"
import { compareSync, hashSync } from "bcrypt-nodejs"

const roles = [ "user", "root" ]
export type UserRole = keyof typeof roles

type TransformedUser = Partial<{name: string, login: string, role: UserRole}>

export type IUser = {
  login: string
  password: string
  name: string
  activationKey: string
  active: boolean
  role: UserRole

  transform: () => TransformedUser
  passwordMatches: (password: string) => boolean
  checkDuplicateLoginError: () => unknown
  findAndGenerateToken: (payload: { login: string, password: string }) => Promise<unknown>
  roles: UserRole
}
type IUserInstanceCreation = Model<IUser>

/**
 * Schema
 */

export const UserSchema = new Schema<IUser, IUserInstanceCreation, IUser>({
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  activationKey: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  // @ts-ignore
  role: {
    type: String,
    default: "user",
    enum: roles,
  },
}, { id: false })

UserSchema.set("toObject", { virtuals: true, versionKey: false })
UserSchema.set("toJSON", { virtuals: true, versionKey: false })

UserSchema.pre("save", async function save (next) {
  try {
    if (!this.isModified("password")) return next()
    // @ts-ignore
    this.password = hashSync(this.password)
    return next()
  }
  catch (error) {
    return next(error)
  }
})

/**
 * Methods
 */
UserSchema.method({
  transform () {
    const transformed: TransformedUser = {}
    const fields = [ "name", "login", "role" ]
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  },

  passwordMatches (password) {
    return compareSync(password, this.password)
  },
})

UserSchema.statics = {
  // @ts-ignore
  roles,

  checkDuplicateLoginError: function (err) {
    if (err.code === 11000) {
      return { error: { code: 409 } }
    }
    return err
  } as IUser["checkDuplicateLoginError"],

  findAndGenerateToken: async function (payload) {
    const { login, password } = payload

    // 400
    if (!login || !password) return { error: { code: 400 } }

    const user = await this.findOne({ login }).exec()
    // 404
    if (!user) return { error: { code: 404 } }

    const passwordOK = user.passwordMatches(password)

    // 401
    if (!passwordOK /* || !user.active */) return { error: { code: 401 } }

    return user
  } as IUser["findAndGenerateToken"],
}

export const UserModel = model("User", UserSchema)
