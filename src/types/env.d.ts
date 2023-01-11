export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'dev' | 'prod'
      DB_STRING: string
      JWT_SECRET: string
    }
  }
}
