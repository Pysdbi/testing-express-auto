import promptSync from "prompt-sync"
import dotenv from "dotenv"
import axios from "axios"

import readline from "readline"

dotenv.config()

process.on("SIGINT", process.exit)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

let jwtToken: string

const API_URL = (path = ""): string => `http://127.0.0.1:${process.env.PORT}/${path}`
const prompt = promptSync({ sigint: true })

const getConfig = (): Record<string, unknown> => ({ headers: { Authorization: `Baerer ${jwtToken}` } })

// API
async function onLogin (): Promise<boolean> {
  const login: string = prompt("Login:  ")
  const password: string = prompt("Password: ")
  const res = await axios.post(API_URL("api/auth/login"), {
    login,
    password,
  })
  const ok = res.data?.message === "OK" ?? false
  if (ok) jwtToken = res.data.token as string
  return ok
}

// API Cars
async function getCarsList (): Promise<void> {
  const res = await axios.get(API_URL("api/cars"), getConfig())
  const ok = res.status / 100 === 2
  if (ok) {
    // eslint-disable-next-line no-console
    console.table(res.data)
  }
  else {
    // eslint-disable-next-line no-console
    console.error("Some error. Try again.")
  }
}

// API Cars
async function getBrandsList (): Promise<void> {
  const res = await axios.get(API_URL("api/brands"), getConfig())
  const ok = res.status / 100 === 2
  if (ok) {
    // eslint-disable-next-line no-console
    console.table(res.data)
  }
  else {
    // eslint-disable-next-line no-console
    console.error("Some error. Try again.")
  }
}

// Main
async function main (): Promise<void> {
  const isRegister: string = prompt("Do you want to register? (Write 'yes'. Else Press enter) ")

  let isAuth: boolean

  if (isRegister.toLowerCase() === "yes") {
    const login: string = prompt("Login:  ")
    const password: string = prompt("Password: ")
    const name: string = prompt("Name:  ")
    await axios.post(API_URL("api/auth/register"), {
      login,
      password,
      name,
    })
    isAuth = await onLogin()
  }
  else {
    isAuth = await onLogin()
  }
  if (!isAuth) { await main(); process.exit(0) }

  // eslint-disable-next-line no-console
  console.log("Your token: ", jwtToken)

  // eslint-disable-next-line no-console
  console.info(`
    1 - cars list
    2 - brands
  `)

  rl.on("line", async (line) => {
    switch (line) {
      case "1": await getCarsList(); break
      case "2": await getBrandsList(); break
    }
    // eslint-disable-next-line no-console
    console.info(`
      Enter number:
      1 - cars list
      2 - brands
    `)
  })
}

void main()
