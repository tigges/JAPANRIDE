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

export const cities: City[] = [
  { code: "TYO", name: "Tokyo", nameJa: "東京" },
  { code: "OSA", name: "Osaka", nameJa: "大阪" },
  { code: "KYO", name: "Kyoto", nameJa: "京都" },
  { code: "NGO", name: "Nagoya", nameJa: "名古屋" },
  { code: "FUK", name: "Fukuoka", nameJa: "福岡" },
  { code: "SPK", name: "Sapporo", nameJa: "札幌" },
  { code: "HIR", name: "Hiroshima", nameJa: "広島" },
  { code: "SEN", name: "Sendai", nameJa: "仙台" },
];

const cityCodes = new Set(cities.map((c) => c.code));

export function isCity(code: string): boolean {
  return cityCodes.has(code);
}

// A small, deterministic timetable used to generate rides between any two cities.
const operators: Array<Pick<Ride, "operator" | "vehicle">> = [
  { operator: "JR Central", vehicle: "Shinkansen" },
  { operator: "Willer Express", vehicle: "Express Bus" },
  { operator: "JapanRide Share", vehicle: "Rideshare" },
];

function hashPair(from: string, to: string): number {
  const key = `${from}->${to}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function searchRides(from: string, to: string): Ride[] {
  if (from === to) return [];
  const seed = hashPair(from, to);
  const baseDurations = [150, 330, 300];
  const basePrices = [13800, 4900, 7600];
  const startTimes = ["07:20", "09:45", "14:10"];

  return operators.map((op, i) => {
    const duration = baseDurations[i] + (seed % 40);
    const departure = startTimes[i];
    return {
      id: `${from}-${to}-${op.vehicle.slice(0, 2).toUpperCase()}-${i}`,
      from,
      to,
      operator: op.operator,
      vehicle: op.vehicle,
      departure,
      arrival: addMinutes(departure, duration),
      durationMinutes: duration,
      priceYen: basePrices[i] + (seed % 7) * 100,
      seatsAvailable: 3 + ((seed >> i) % 20),
    };
  });
}
