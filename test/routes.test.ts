import request from "supertest"

import app from "../src/app"

describe('Test app', () => {
  it('test routes /api', async () => {
    const res = await request(app).get("/api")
    expect(res.body).toEqual({msg: "Testing-express-auto" })
  })
})
