import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

const app = createApp();

describe("JAPANRIDE API", () => {
  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("lists cities", async () => {
    const res = await request(app).get("/api/cities");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("code");
  });

  it("returns rides sorted by duration", async () => {
    const res = await request(app).get("/api/rides?from=TYO&to=OSA");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    const durations = res.body.map((r: { durationMinutes: number }) => r.durationMinutes);
    expect([...durations]).toEqual([...durations].sort((a, b) => a - b));
  });

  it("rejects identical origin and destination", async () => {
    const res = await request(app).get("/api/rides?from=TYO&to=TYO");
    expect(res.status).toBe(400);
  });

  it("rejects unknown cities", async () => {
    const res = await request(app).get("/api/rides?from=XXX&to=OSA");
    expect(res.status).toBe(400);
  });

  it("books a ride end to end", async () => {
    const rides = await request(app).get("/api/rides?from=TYO&to=KYO");
    const ride = rides.body[0];

    const booking = await request(app)
      .post("/api/bookings")
      .send({ rideId: ride.id, passenger: "Hiro Tanaka", seats: 2 });

    expect(booking.status).toBe(201);
    expect(booking.body.totalYen).toBe(ride.priceYen * 2);
    expect(booking.body.id).toMatch(/^BK-/);

    const fetched = await request(app).get(`/api/bookings/${booking.body.id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.passenger).toBe("Hiro Tanaka");
  });

  it("rejects booking with too many seats", async () => {
    const rides = await request(app).get("/api/rides?from=TYO&to=FUK");
    const ride = rides.body[0];
    const res = await request(app)
      .post("/api/bookings")
      .send({ rideId: ride.id, passenger: "Test", seats: 9999 });
    expect(res.status).toBe(409);
  });
});
