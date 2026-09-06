import { describe, expect, it } from "vitest";
import { basemaps } from "./basemap";
import { japanBounds, regionOf, regions, stops, stopsByRegion } from "./journey";
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

  it("runs generally north to south from Shiretoko to Yaeyama", () => {
    const first = stops[0];
    const last = stops[stops.length - 1];
    expect(first?.id).toBe("shiretoko");
    expect(last?.id).toBe("yaeyama");
    expect(first!.lat).toBeGreaterThan(last!.lat);
    expect(first!.lat - last!.lat).toBeGreaterThan(15);
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
