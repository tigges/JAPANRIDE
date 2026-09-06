import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { cities, isCity, searchRides, type Ride } from "./data.js";

export interface Booking {
  id: string;
  ride: Ride;
  passenger: string;
  seats: number;
  totalYen: number;
  createdAt: string;
}

export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // In-memory booking store. Fine for a demo/dev environment.
  const bookings = new Map<string, Booking>();

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "japanride", time: new Date().toISOString() });
  });

  app.get("/api/cities", (_req: Request, res: Response) => {
    res.json(cities);
  });

  app.get("/api/rides", (req: Request, res: Response) => {
    const from = String(req.query.from ?? "").toUpperCase();
    const to = String(req.query.to ?? "").toUpperCase();

    if (!from || !to) {
      return res.status(400).json({ error: "Both 'from' and 'to' query params are required." });
    }
    if (!isCity(from) || !isCity(to)) {
      return res.status(400).json({ error: "Unknown city code." });
    }
    if (from === to) {
      return res.status(400).json({ error: "Origin and destination must differ." });
    }

    const rides = searchRides(from, to).sort((a, b) => a.durationMinutes - b.durationMinutes);
    res.json(rides);
  });

  app.post("/api/bookings", (req: Request, res: Response) => {
    const { rideId, passenger, seats } = req.body ?? {};
    const seatCount = Number(seats ?? 1);

    if (!rideId || typeof rideId !== "string") {
      return res.status(400).json({ error: "rideId is required." });
    }
    if (!passenger || typeof passenger !== "string") {
      return res.status(400).json({ error: "passenger name is required." });
    }
    if (!Number.isInteger(seatCount) || seatCount < 1) {
      return res.status(400).json({ error: "seats must be a positive integer." });
    }

    const [from, to] = rideId.split("-");
    const ride = searchRides(from, to).find((r) => r.id === rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found." });
    }
    if (seatCount > ride.seatsAvailable) {
      return res.status(409).json({ error: "Not enough seats available." });
    }

    const booking: Booking = {
      id: `BK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      ride,
      passenger,
      seats: seatCount,
      totalYen: ride.priceYen * seatCount,
      createdAt: new Date().toISOString(),
    };
    bookings.set(booking.id, booking);
    res.status(201).json(booking);
  });

  app.get("/api/bookings/:id", (req: Request, res: Response) => {
    const booking = bookings.get(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    res.json(booking);
  });

  return app;
}
