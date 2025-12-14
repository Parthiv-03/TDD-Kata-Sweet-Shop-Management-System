const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/User");
const Sweet = require("../../src/models/Sweet");

let adminToken;
let userToken;
let sweetId;

beforeEach(async () => {
  // Register Admin
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@inventory.com",
    password: "admin123"
  });

  await User.updateOne(
    { email: "admin@inventory.com" },
    { role: "ADMIN" }
  );

  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@inventory.com",
      password: "admin123"
    });

  adminToken = adminLogin.body.token;

  // Register User
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@inventory.com",
    password: "user123"
  });

  const userLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "user@inventory.com",
      password: "user123"
    });

  userToken = userLogin.body.token;

  // Add Sweet (Admin)
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Gulab Jamun",
      category: "Indian Sweet",
      price: 100,
      quantity: 10
    });

  sweetId = sweetRes.body._id;
});

describe("Inventory API", () => {
  it("should allow user to purchase sweet and decrease quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Purchase successful");

    const sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(8);
  });

  it("should NOT allow purchase if quantity exceeds stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 20 });

    expect(res.statusCode).toBe(400);
  });

  it("should allow admin to restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Restocked successfully");

    const sweet = await Sweet.findById(sweetId);
    expect(sweet.quantity).toBe(15);
  });

  it("should NOT allow user to restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(403);
  });
});
