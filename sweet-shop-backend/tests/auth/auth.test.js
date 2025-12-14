const request = require("supertest");
const app = require("../../src/app");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  it("should login a user and return JWT", async () => {
    await request(app).post("/api/auth/register").send({
        name: "Login User",
        email: "login@example.com",
        password: "pass123"
    });

    const res = await request(app)
        .post("/api/auth/login")
        .send({
        email: "login@example.com",
        password: "pass123"
        });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    });
});

