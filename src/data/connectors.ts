import { stops, type Stop } from "./journey";
import type { SegmentKind } from "./schema";

/** How the catalog is stitched from one NHK episode-tour to the next. */
export type JumpKind = Extract<SegmentKind, "ferry" | "train" | "flight"> | "ride";

export type TourJump = {
  id: string;
  from: string;
  to: string;
  kind: JumpKind;
  note: string;
  /** Island packages hang off a gateway; they are not mainland spine. */
  islandAccess?: boolean;
};

export const JUMP_KINDS: JumpKind[] = ["ride", "train", "ferry", "flight"];

/**
 * Mainland story spine — ends at Kagoshima. Southwestern (and other) island
 * episodes are separate trips reached by ferry or flight.
 */
export const SPINE_IDS = [
  "shiretoko",
  "kushiro",
  "furano",
  "hakodate",
  "aomori",
  "akita",
  "iwate",
  "miyagi",
  "yamagata",
  "aizu",
  "niigata",
  "toyama",
  "kanazawa",
  "wajima",
  "fukui",
  "gunma",
  "nikko",
  "ibaraki",
  "saitama",
  "tokyo",
  "boso",
  "izu",
  "fuji",
  "shizuoka",
  "yatsugatake",
  "narai",
  "northern-alps",
  "gifu",
  "biwa",
  "kyoto",
  "osaka",
  "nara",
  "kii",
  "ise",
  "awaji",
  "tottori",
  "izumo",
  "okayama",
  "shimanami",
  "yamaguchi",
  "kagawa",
  "naruto",
  "ehime",
  "kochi",
  "fukuoka",
  "oita",
  "nagasaki",
  "kumamoto",
  "miyazaki",
  "kagoshima",
] as const;

export const ISLAND_TRIP_IDS = [
  "sado",
  "niijima",
  "goto",
  "yakushima",
  "amami",
  "okinawa",
  "miyako",
  "yaeyama",
] as const;

export const JUMP_STYLE: Record<
  JumpKind,
  { color: string; dash: string; label: string; weight: number }
> = {
  ride: { color: "#c4452d", dash: "7 8", label: "Ride between tours", weight: 3 },
  train: { color: "#c9a05a", dash: "2 8", label: "Train jump", weight: 3 },
  ferry: { color: "#6b5b95", dash: "8 7", label: "Ferry jump", weight: 3 },
  flight: { color: "#8a8680", dash: "1 10", label: "Flight jump", weight: 2 },
};

const spineKinds: [string, string, JumpKind, string][] = [
  ["shiretoko", "kushiro", "ride", "East Hokkaido continuation"],
  ["kushiro", "furano", "ride", "Tokachi to the interior"],
  ["furano", "hakodate", "train", "Long Hokkaido transfer south"],
  ["hakodate", "aomori", "ferry", "Tsugaru Strait"],
  ["aomori", "akita", "ride", "West Tohoku"],
  ["akita", "iwate", "ride", "Across Tohoku"],
  ["iwate", "miyagi", "ride", "Sanriku to the Abukuma"],
  ["miyagi", "yamagata", "ride", "Over the Ou mountains"],
  ["yamagata", "aizu", "ride", "South Tohoku basins"],
  ["aizu", "niigata", "ride", "Into the Sea of Japan side"],
  ["niigata", "toyama", "ride", "Hokuriku coast (Sado is a ferry spur)"],
  ["toyama", "kanazawa", "ride", "Bay to Kaga"],
  ["kanazawa", "wajima", "ride", "Onto Noto"],
  ["wajima", "fukui", "ride", "Noto down to Echizen"],
  ["fukui", "gunma", "train", "Hokuriku to inland Kanto — catalog jump"],
  ["gunma", "nikko", "ride", "Tomioka toward Nikko"],
  ["nikko", "ibaraki", "ride", "Tochigi into Ibaraki"],
  ["ibaraki", "saitama", "ride", "Kanto plain"],
  ["saitama", "tokyo", "ride", "Into the capital's west"],
  ["tokyo", "boso", "ride", "Across to Chiba"],
  ["boso", "izu", "train", "Tokyo Bay / Tokaido transfer"],
  ["izu", "fuji", "ride", "Peninsula up to the highlands"],
  ["fuji", "shizuoka", "ride", "Fuji to wasabi country"],
  ["shizuoka", "yatsugatake", "train", "Coast to highland jump"],
  ["yatsugatake", "narai", "ride", "Kiso valleys"],
  ["narai", "northern-alps", "ride", "Up the Kiso–Hida"],
  ["northern-alps", "gifu", "ride", "Down to the three rivers"],
  ["gifu", "biwa", "ride", "Toward the lake"],
  ["biwa", "kyoto", "ride", "Lake to countryside"],
  ["kyoto", "osaka", "ride", "Kansai basins"],
  ["osaka", "nara", "ride", "Yamato basin"],
  ["nara", "kii", "ride", "Into the peninsula mountains"],
  ["kii", "ise", "ride", "Kii to the Ama coast"],
  ["ise", "awaji", "train", "Around Ise Bay to Awaji"],
  ["awaji", "tottori", "train", "Inland Sea to San'in — catalog jump"],
  ["tottori", "izumo", "ride", "San'in coast"],
  ["izumo", "okayama", "ride", "Across Chugoku"],
  ["okayama", "shimanami", "ride", "Onto the bridge chain"],
  ["shimanami", "yamaguchi", "ride", "West along the Seto"],
  ["yamaguchi", "kagawa", "train", "Honshu to Shikoku (Seto Ohashi)"],
  ["kagawa", "naruto", "ride", "Sanuki to the straits"],
  ["naruto", "ehime", "ride", "Around Shikoku"],
  ["ehime", "kochi", "ride", "Karst to the Pacific south"],
  ["kochi", "fukuoka", "ferry", "Shikoku to Kyushu"],
  ["fukuoka", "oita", "ride", "North Kyushu"],
  ["oita", "nagasaki", "ride", "Across Kyushu (Goto is a ferry spur)"],
  ["nagasaki", "kumamoto", "ride", "East to Aso"],
  ["kumamoto", "miyazaki", "ride", "Caldera to the mythic gorge"],
  ["miyazaki", "kagoshima", "ride", "Last mainland stage"],
];

const islandAccess: [string, string, JumpKind, string][] = [
  ["niigata", "sado", "ferry", "Sado Island package — not a spine stage"],
  ["izu", "niijima", "ferry", "Tokyo islands package from Izu"],
  ["nagasaki", "goto", "ferry", "Goto package from Nagasaki"],
  ["kagoshima", "yakushima", "ferry", "Yakushima / Tanegashima from Satsuma"],
  ["kagoshima", "amami", "flight", "Amami as its own fly-in loop"],
  ["kagoshima", "okinawa", "flight", "Okinawa Honto as its own fly-in loop"],
  ["okinawa", "miyako", "flight", "Miyako package from Naha"],
  ["okinawa", "yaeyama", "flight", "Yaeyama package from Naha"],
];

function toJumps(rows: [string, string, JumpKind, string][], islandAccessFlag: boolean): TourJump[] {
  return rows.map(([from, to, kind, note]) => ({
    id: `${from}-${to}`,
    from,
    to,
    kind,
    note,
    islandAccess: islandAccessFlag,
  }));
}

export const spineJumps: TourJump[] = toJumps(spineKinds, false);
export const islandJumps: TourJump[] = toJumps(islandAccess, true);
export const tourJumps: TourJump[] = [...spineJumps, ...islandJumps];

const islandSet = new Set<string>(ISLAND_TRIP_IDS);
const spineSet = new Set<string>(SPINE_IDS);
const hubIndex = new Map(stops.map((s) => [s.id, s]));

export function isIslandTrip(stopId: string): boolean {
  return islandSet.has(stopId);
}

export function isSpineHub(stopId: string): boolean {
  return spineSet.has(stopId);
}

export function hubOf(id: string): Stop | undefined {
  return hubIndex.get(id);
}

/** Jumps that touch at least one currently visible hub (gateway may sit off-filter). */
export function jumpsForVisible(stopIds: Set<string>): TourJump[] {
  return tourJumps.filter((j) => stopIds.has(j.from) || stopIds.has(j.to));
}

export function jumpsTouching(stopId: string): { inbound: TourJump[]; outbound: TourJump[] } {
  return {
    inbound: tourJumps.filter((j) => j.to === stopId),
    outbound: tourJumps.filter((j) => j.from === stopId),
  };
}

export function assertJumpGraph(): void {
  const ids = new Set(stops.map((s) => s.id));
  for (const id of SPINE_IDS) {
    if (!ids.has(id)) throw new Error(`Unknown spine hub ${id}`);
  }
  for (const id of ISLAND_TRIP_IDS) {
    if (!ids.has(id)) throw new Error(`Unknown island trip ${id}`);
    if (spineSet.has(id)) throw new Error(`Island trip ${id} must not sit on the land spine`);
  }
  if (SPINE_IDS[0] !== "shiretoko" || SPINE_IDS[SPINE_IDS.length - 1] !== "kagoshima") {
    throw new Error("Spine must run Shiretoko to Kagoshima");
  }
  const classified = new Set<string>([...SPINE_IDS, ...ISLAND_TRIP_IDS]);
  for (const stop of stops) {
    if (!classified.has(stop.id)) {
      throw new Error(`Hub ${stop.id} is neither spine nor island trip`);
    }
  }
  for (let i = 0; i < SPINE_IDS.length - 1; i++) {
    const from = SPINE_IDS[i];
    const to = SPINE_IDS[i + 1];
    if (!spineJumps.some((j) => j.from === from && j.to === to)) {
      throw new Error(`Missing spine jump ${from} → ${to}`);
    }
  }
  if (spineJumps.length !== SPINE_IDS.length - 1) {
    throw new Error("Spine jump count must match consecutive spine pairs");
  }
  for (const jump of islandJumps) {
    if (!islandSet.has(jump.to)) {
      throw new Error(`Island jump must land on an island trip: ${jump.to}`);
    }
  }
  for (const jump of tourJumps) {
    if (!ids.has(jump.from) || !ids.has(jump.to)) {
      throw new Error(`Jump ${jump.from} → ${jump.to} references unknown hub`);
    }
  }
}
