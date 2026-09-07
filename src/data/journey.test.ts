import { describe, expect, it } from "vitest";
import { basemaps } from "./basemap";
import { japanBounds, regionOf, regions, stops, stopsByRegion } from "./journey";
import { hasItinerary, itineraries, itineraryOf } from "./itineraries";
import { officialRoutes } from "./officialRoutes";
import { MATCH_LABEL, SEGMENT_STYLE } from "./schema";
import {
  ISLAND_TRIP_IDS,
  JUMP_STYLE,
  SPINE_IDS,
  assertJumpGraph,
  isIslandTrip,
  isSpineHub,
  spineJumps,
  tourJumps,
} from "./connectors";
import { SITE_VERSION, siteVersionLabel } from "./version";
import { vodEpisodes } from "./vod";

describe("grand Japan journey", () => {
  it("has nine ordered regions covering the archipelago", () => {
    expect(regions.map((r) => r.id)).toEqual([
      "hokkaido",
      "tohoku",
      "hokuriku",
      "kanto",
      "alps",
      "kansai",
      "seto",
      "kyushu",
      "nansei",
    ]);
    expect(regions.map((r) => r.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("gives every stop a unique id, region, and Japan-box coordinate", () => {
    const ids = new Set(stops.map((s) => s.id));
    expect(ids.size).toBe(stops.length);
    expect(stops.length).toBeGreaterThanOrEqual(50);

    for (const stop of stops) {
      regionOf(stop.region);
      expect(stop.name.length).toBeGreaterThan(2);
      expect(stop.summary.length).toBeGreaterThan(20);
      expect(stop.highlights.length).toBeGreaterThan(0);
      expect(stop.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
      expect(stop.lat).toBeLessThanOrEqual(japanBounds.maxLat);
      expect(stop.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
      expect(stop.lng).toBeLessThanOrEqual(japanBounds.maxLng);
    }
  });

  it("keeps catalog order north to south, with island packages after the land spine", () => {
    const first = stops[0];
    const last = stops[stops.length - 1];
    expect(first?.id).toBe("shiretoko");
    expect(last?.id).toBe("yaeyama");
    expect(first!.lat).toBeGreaterThan(last!.lat);
    expect(first!.lat - last!.lat).toBeGreaterThan(15);
    expect(SPINE_IDS[SPINE_IDS.length - 1]).toBe("kagoshima");
  });

  it("places at least three stops in every region", () => {
    for (const region of regions) {
      expect(stopsByRegion(region.id).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("links streaming episodes to journey stops where possible", () => {
    const vodIds = new Set(stops.map((s) => s.vodId).filter(Boolean));
    expect(vodIds.has("2066084")).toBe(true);
    expect(vodIds.has("2066085")).toBe(true);
    expect(vodIds.has("2066088")).toBe(true);
  });
});

describe("NHK VOD catalog", () => {
  it("uses official NHK WORLD episode URLs and images", () => {
    expect(vodEpisodes.length).toBeGreaterThanOrEqual(12);
    for (const episode of vodEpisodes) {
      expect(episode.url).toMatch(/^https:\/\/www3\.nhk\.or\.jp\/nhkworld\/en\/shows\/\d+\/$/);
      expect(episode.hero).toContain("/nhkworld/en/shows/");
      expect(episode.durationSec).toBeGreaterThan(600);
    }
  });

  it("keeps the Japan journey separate from the Taiwan special", () => {
    expect(vodEpisodes.some((e) => e.japan)).toBe(true);
    expect(vodEpisodes.some((e) => !e.japan && e.title.includes("Taiwan"))).toBe(true);
  });
});

describe("site version", () => {
  it("is a positive integer that ticks with each git step", () => {
    expect(Number.isInteger(SITE_VERSION)).toBe(true);
    expect(SITE_VERSION).toBeGreaterThan(0);
    expect(siteVersionLabel()).toBe(`v${SITE_VERSION}`);
  });
});

describe("basemap", () => {
  it("offers English and Japanese key-free tiles, never Carto", () => {
    expect(basemaps.en.url).toContain("arcgisonline.com");
    expect(basemaps.ja.url).toContain("cyberjapandata.gsi.go.jp");
    expect(basemaps.en.label).toBe("English");
    expect(basemaps.ja.label).toBe("日本語");
    expect(basemaps.en.url.toLowerCase()).not.toContain("carto");
    expect(basemaps.ja.url.toLowerCase()).not.toContain("carto");
  });
});

describe("episode itineraries", () => {
  it("maps NHK hubs with days, waypoints, and segment kinds", () => {
    const ids = itineraries.map((i) => i.stopId).sort();
    expect(ids).toEqual(
      [
        "aomori",
        "biwa",
        "boso",
        "goto",
        "ibaraki",
        "izu",
        "kanazawa",
        "kushiro",
        "oita",
        "okayama",
        "sado",
        "shimanami",
        "toyama",
      ].sort(),
    );
    expect(itineraries.length).toBeGreaterThanOrEqual(13);
    const itineraryIds = new Set(itineraries.map((i) => i.id));
    expect(itineraryIds.size).toBe(itineraries.length);
    for (const ride of itineraries) {
      expect(stops.some((s) => s.id === ride.stopId)).toBe(true);
      for (const extra of ride.extraStopIds ?? []) {
        expect(stops.some((s) => s.id === extra)).toBe(true);
      }
      expect(ride.layer).toBe("nhk");
      expect(ride.days.length).toBeGreaterThanOrEqual(2);
      expect(ride.waypoints.length).toBeGreaterThanOrEqual(4);
      const wpIds = new Set(ride.waypoints.map((w) => w.id));
      expect(wpIds.size).toBe(ride.waypoints.length);
      for (const seg of ride.segments) {
        expect(wpIds.has(seg.from)).toBe(true);
        expect(wpIds.has(seg.to)).toBe(true);
        expect(SEGMENT_STYLE[seg.kind]).toBeTruthy();
        expect(MATCH_LABEL[seg.official]).toBeTruthy();
        expect(seg.path.length).toBeGreaterThan(0);
      }
    }
  });

  it("opens the Noto ride from both Kanazawa and Wajima hubs", () => {
    expect(hasItinerary("kanazawa")).toBe(true);
    expect(hasItinerary("wajima")).toBe(true);
    expect(itineraryOf("kanazawa")?.id).toBe("noto");
    expect(itineraryOf("wajima")?.id).toBe("noto");
  });

  it("keeps NHK itineraries in the Japan bounding box", () => {
    for (const ride of itineraries) {
      for (const wp of ride.waypoints) {
        expect(wp.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
        expect(wp.lat).toBeLessThanOrEqual(japanBounds.maxLat);
        expect(wp.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
        expect(wp.lng).toBeLessThanOrEqual(japanBounds.maxLng);
      }
    }
  });

  it("shows on / mixed / off official-route examples", () => {
    const shima = itineraries.find((i) => i.stopId === "shimanami")!;
    const goto = itineraries.find((i) => i.stopId === "goto")!;
    const boso = itineraries.find((i) => i.stopId === "boso")!;
    const sado = itineraries.find((i) => i.stopId === "sado")!;
    const kushiro = itineraries.find((i) => i.stopId === "kushiro")!;
    const toyama = itineraries.find((i) => i.stopId === "toyama")!;
    expect(shima.segments.filter((s) => s.kind !== "overnight").every((s) => s.official === "on")).toBe(
      true,
    );
    expect(goto.officialRoutes).toEqual([]);
    expect(goto.segments.every((s) => s.official === "off")).toBe(true);
    expect(sado.officialRoutes).toEqual([]);
    expect(sado.segments.every((s) => s.official === "off")).toBe(true);
    expect(boso.segments.some((s) => s.official === "on")).toBe(true);
    expect(boso.segments.some((s) => s.official === "off")).toBe(true);
    expect(kushiro.segments.some((s) => s.official === "on" && s.officialRoute === "tokapuchi400")).toBe(
      true,
    );
    expect(kushiro.segments.some((s) => s.official === "off")).toBe(true);
    expect(toyama.segments.some((s) => s.official === "on" && s.officialRoute === "toyama-bay")).toBe(
      true,
    );
    expect(toyama.segments.some((s) => s.official === "off")).toBe(true);
  });

  it("sketches Tokapuchi 400, Toyama Bay, and Yamanami underlays", () => {
    for (const id of ["tokapuchi400", "toyama-bay", "yamanami"] as const) {
      const route = officialRoutes.find((r) => r.id === id);
      expect(route?.path.length).toBeGreaterThan(3);
    }
  });
});

describe("NHK tour jumps", () => {
  it("validates a Shiretoko–Kagoshima spine with island packages off it", () => {
    expect(() => assertJumpGraph()).not.toThrow();
    expect(SPINE_IDS[0]).toBe("shiretoko");
    expect(SPINE_IDS[SPINE_IDS.length - 1]).toBe("kagoshima");
    expect([...ISLAND_TRIP_IDS]).toEqual([
      "sado",
      "niijima",
      "goto",
      "yakushima",
      "amami",
      "okinawa",
      "miyako",
      "yaeyama",
    ]);
    for (const id of ISLAND_TRIP_IDS) {
      expect(isIslandTrip(id)).toBe(true);
      expect(isSpineHub(id)).toBe(false);
    }
    expect(isSpineHub("kagoshima")).toBe(true);
    expect(isIslandTrip("kagoshima")).toBe(false);
  });

  it("classifies every hub as land spine or island trip", () => {
    const classified = new Set<string>([...SPINE_IDS, ...ISLAND_TRIP_IDS]);
    expect(classified.size).toBe(stops.length);
    for (const stop of stops) {
      expect(classified.has(stop.id)).toBe(true);
    }
  });

  it("does not draw island packages as consecutive spine stages", () => {
    const spinePairs = new Set(spineJumps.map((j) => `${j.from}->${j.to}`));
    expect(spinePairs.has("niigata->sado")).toBe(false);
    expect(spinePairs.has("sado->toyama")).toBe(false);
    expect(spinePairs.has("nagasaki->goto")).toBe(false);
    expect(spinePairs.has("goto->kumamoto")).toBe(false);
    expect(spinePairs.has("kagoshima->yakushima")).toBe(false);
    expect(spinePairs.has("niigata->toyama")).toBe(true);
    expect(spinePairs.has("nagasaki->kumamoto")).toBe(true);
    expect(spinePairs.has("miyazaki->kagoshima")).toBe(true);
  });

  it("color-codes ride, train, ferry, and flight jumps", () => {
    const kinds = new Set(tourJumps.map((j) => j.kind));
    expect(kinds).toEqual(new Set(["ride", "train", "ferry", "flight"]));
    expect(JUMP_STYLE.ride.color).toBe("#c4452d");
    expect(JUMP_STYLE.train.color).toBe("#c9a05a");
    expect(JUMP_STYLE.ferry.color).toBe("#6b5b95");
    expect(JUMP_STYLE.flight.color).toBe("#8a8680");
    expect(tourJumps.some((j) => j.kind === "ferry" && j.islandAccess)).toBe(true);
    expect(tourJumps.some((j) => j.kind === "flight" && j.islandAccess)).toBe(true);
  });
});
