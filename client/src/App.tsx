import { useEffect, useMemo, useState } from "react";
import {
  bookRide,
  getCities,
  searchRides,
  type Booking,
  type City,
  type Ride,
} from "./api.js";

const vehicleEmoji: Record<Ride["vehicle"], string> = {
  Shinkansen: "🚄",
  "Express Bus": "🚌",
  Rideshare: "🚗",
};

function formatYen(value: number): string {
  return `¥${value.toLocaleString("ja-JP")}`;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [from, setFrom] = useState("TYO");
  const [to, setTo] = useState("OSA");
  const [rides, setRides] = useState<Ride[]>([]);
  const [selected, setSelected] = useState<Ride | null>(null);
  const [passenger, setPassenger] = useState("");
  const [seats, setSeats] = useState(1);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCities().then(setCities).catch((e) => setError(e.message));
  }, []);

  const cityName = useMemo(() => {
    const map = new Map(cities.map((c) => [c.code, c]));
    return (code: string) => {
      const c = map.get(code);
      return c ? `${c.name} ${c.nameJa}` : code;
    };
  }, [cities]);

  async function onSearch() {
    setError(null);
    setBooking(null);
    setSelected(null);
    setLoading(true);
    try {
      setRides(await searchRides(from, to));
    } catch (e) {
      setRides([]);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function onBook() {
    if (!selected) return;
    setError(null);
    try {
      const result = await bookRide(selected.id, passenger.trim(), seats);
      setBooking(result);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="brand">
          <span className="brand-mark">🗾</span>
          <span className="brand-name">JAPAN<span>RIDE</span></span>
        </div>
        <p className="tagline">Search Shinkansen, express buses and rideshares across Japan — book in seconds.</p>
      </header>

      <main className="content">
        <section className="search-card">
          <div className="field">
            <label htmlFor="from">From</label>
            <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.nameJa})
                </option>
              ))}
            </select>
          </div>
          <button
            className="swap"
            title="Swap"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            ⇄
          </button>
          <div className="field">
            <label htmlFor="to">To</label>
            <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.nameJa})
                </option>
              ))}
            </select>
          </div>
          <button className="primary search-btn" onClick={onSearch} disabled={loading}>
            {loading ? "Searching…" : "Search rides"}
          </button>
        </section>

        {error && <div className="error">⚠️ {error}</div>}

        {booking && (
          <section className="confirmation">
            <h2>Booking confirmed ✅</h2>
            <p className="confirm-id">Reference <strong>{booking.id}</strong></p>
            <div className="confirm-grid">
              <div><span>Passenger</span><strong>{booking.passenger}</strong></div>
              <div><span>Route</span><strong>{cityName(booking.ride.from)} → {cityName(booking.ride.to)}</strong></div>
              <div><span>Service</span><strong>{vehicleEmoji[booking.ride.vehicle]} {booking.ride.operator}</strong></div>
              <div><span>Seats</span><strong>{booking.seats}</strong></div>
              <div><span>Total</span><strong>{formatYen(booking.totalYen)}</strong></div>
            </div>
          </section>
        )}

        {!booking && rides.length > 0 && (
          <section className="results">
            <h2>{rides.length} rides · {cityName(from)} → {cityName(to)}</h2>
            <ul>
              {rides.map((ride) => (
                <li
                  key={ride.id}
                  className={`ride ${selected?.id === ride.id ? "active" : ""}`}
                  onClick={() => setSelected(ride)}
                >
                  <div className="ride-main">
                    <span className="vehicle">{vehicleEmoji[ride.vehicle]}</span>
                    <div>
                      <div className="operator">{ride.operator}</div>
                      <div className="vehicle-type">{ride.vehicle}</div>
                    </div>
                  </div>
                  <div className="times">
                    <strong>{ride.departure} → {ride.arrival}</strong>
                    <span>{formatDuration(ride.durationMinutes)} · {ride.seatsAvailable} seats left</span>
                  </div>
                  <div className="price">{formatYen(ride.priceYen)}</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!booking && selected && (
          <section className="booking-card">
            <h2>Book {selected.operator} · {formatYen(selected.priceYen)}/seat</h2>
            <div className="field">
              <label htmlFor="passenger">Passenger name</label>
              <input
                id="passenger"
                value={passenger}
                placeholder="e.g. Hiro Tanaka"
                onChange={(e) => setPassenger(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="seats">Seats</label>
              <input
                id="seats"
                type="number"
                min={1}
                max={selected.seatsAvailable}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
              />
            </div>
            <div className="total-row">
              <span>Total</span>
              <strong>{formatYen(selected.priceYen * seats)}</strong>
            </div>
            <button className="primary" onClick={onBook} disabled={!passenger.trim()}>
              Confirm booking
            </button>
          </section>
        )}
      </main>

      <footer className="footer">Made for the JAPANRIDE dev environment demo.</footer>
    </div>
  );
}
