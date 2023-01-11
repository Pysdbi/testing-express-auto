import express, { Express } from "express"
import dotenv from "dotenv"
import mongoose, { connect, disconnect } from "mongoose"
import bodyParser from "body-parser"
import session from "express-session"

import passport from "passport"
import { JWT } from "./services/passport.service"
import router from "./routes"

dotenv.config()

export const app: Express = express()
const port = process.env.PORT

import("./models/car.model")

// Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

// Routes
app.use("/api", router)

// Passport
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}))
app.use(passport.session())
app.use(passport.initialize())
passport.use("jwt", JWT)

export async function main (): Promise<void> {
  try {
    mongoose.set("strictQuery", true)
    await connect(process.env.DB_STRING, {})
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(`[server]: Server is running at http://localhost:${port}`)
    })
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

void main()

// Hook on Exit
process.on("SIGINT", async () => {
  await disconnect()
  // eslint-disable-next-line no-console
  console.info("[server]: Server is stopped.")
  process.exit()
})
