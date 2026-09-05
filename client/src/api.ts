export interface City {
  code: string;
  name: string;
  nameJa: string;
}

export interface Ride {
  id: string;
  from: string;
  to: string;
  operator: string;
  vehicle: "Shinkansen" | "Express Bus" | "Rideshare";
  departure: string;
  arrival: string;
  durationMinutes: number;
  priceYen: number;
  seatsAvailable: number;
}

export interface Booking {
  id: string;
  ride: Ride;
  passenger: string;
  seats: number;
  totalYen: number;
  createdAt: string;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function getCities(): Promise<City[]> {
  return fetch("/api/cities").then((r) => handle<City[]>(r));
}

export function searchRides(from: string, to: string): Promise<Ride[]> {
  return fetch(`/api/rides?from=${from}&to=${to}`).then((r) => handle<Ride[]>(r));
}

export function bookRide(rideId: string, passenger: string, seats: number): Promise<Booking> {
  return fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId, passenger, seats }),
  }).then((r) => handle<Booking>(r));
}
