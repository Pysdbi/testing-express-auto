export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'dev' | 'prod' | "test"
      DB_STRING: string
      JWT_SECRET: string
    }
  }
}
