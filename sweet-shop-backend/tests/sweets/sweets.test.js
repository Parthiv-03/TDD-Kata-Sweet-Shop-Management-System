const request = require("supertest");
const app = require("../../src/app");

let adminToken;
let userToken;

beforeEach(async () => {
  // Register Admin
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "admin123"
  });

  // Make admin manually (DB-level)
  const User = require("../../src/models/User");
  await User.updateOne(
    { email: "admin@test.com" },
    { role: "ADMIN" }
  );

  // Login Admin
  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "admin123"
    });

  adminToken = adminLogin.body.token;

  // Register User
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@test.com",
    password: "user123"
  });

  // Login User
  const userLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "user@test.com",
      password: "user123"
    });

  userToken = userLogin.body.token;
});

describe("Sweets API", () => {
  it("should allow admin to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Kaju Katli",
        category: "Indian Sweet",
        price: 450,
        quantity: 20
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Kaju Katli");
  });

  it("should NOT allow user to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian Sweet",
        price: 120,
        quantity: 10
      });

    expect(res.statusCode).toBe(403);
  });

  it("should get all sweets", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Barfi",
        category: "Indian Sweet",
        price: 200,
        quantity: 15
      });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should search sweets by name", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Chocolate Barfi",
        category: "Fusion",
        price: 300,
        quantity: 10
      });

    const res = await request(app)
      .get("/api/sweets/search?name=chocolate")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
