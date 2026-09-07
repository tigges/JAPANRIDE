/**
 * Shared geometry for every drawn journey.
 *
 * Layers stay independent — do not merge into one polyline:
 * - `nhk`        reconstructed Cycle Around Japan episode days
 * - `network`    official cycle routes (National Cycle Routes, prefectural)
 * - `japanride`  a future original traverse that *rides the network* and may
 *                optionally splice NHK episode days as detours
 *
 * Strava (later) is a popularity signal for choosing which official roads
 * to prefer, not a GPS layer we store until export/TOS is explicit.
 */

export type JourneyLayer = "nhk" | "network" | "japanride";

export type SegmentKind =
  | "coast"
  | "lake"
  | "river"
  | "pass"
  | "island"
  | "rural"
  | "urban"
  | "ferry"
  | "train"
  | "flight"
  | "overnight";

export type OfficialMatch = "on" | "alongside" | "off";

export type OfficialRouteId =
  | "shimanami"
  | "biwaichi"
  | "rinrin"
  | "pacific-coast"
  | "toyama-bay"
  | "tokapuchi400";

export type WaypointKind = "start" | "place" | "overnight" | "end" | "gateway";

export type LatLng = [number, number];

export type Waypoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: WaypointKind;
  note?: string;
};

export type Segment = {
  id: string;
  from: string;
  to: string;
  kind: SegmentKind;
  official: OfficialMatch;
  officialRoute?: OfficialRouteId;
  km?: number;
  note?: string;
  path: LatLng[];
};

export type RideDay = {
  id: string;
  label: string;
  title: string;
  waypointIds: string[];
  segmentIds: string[];
};

export type Itinerary = {
  id: string;
  layer: JourneyLayer;
  stopId: string;
  title: string;
  disclaimer: string;
  waypoints: Waypoint[];
  segments: Segment[];
  days: RideDay[];
  officialRoutes: OfficialRouteId[];
};

export const SEGMENT_STYLE: Record<
  SegmentKind,
  { color: string; dash?: string; label: string; weight: number }
> = {
  coast: { color: "#1d6f8a", label: "Coast", weight: 4 },
  lake: { color: "#3d7ea6", label: "Lake", weight: 4 },
  river: { color: "#2a9d8f", label: "River", weight: 4 },
  pass: { color: "#6b4a2f", label: "Hill / pass", weight: 4 },
  island: { color: "#c47a3d", label: "Island roads", weight: 4 },
  rural: { color: "#4a6b3a", label: "Rural roads", weight: 4 },
  urban: { color: "#5c5854", label: "Town", weight: 4 },
  ferry: { color: "#6b5b95", label: "Ferry", weight: 3, dash: "8 7" },
  train: { color: "#c9a05a", label: "Train", weight: 3, dash: "2 8" },
  flight: { color: "#8a8680", label: "Flight", weight: 2, dash: "1 10" },
  overnight: { color: "#c4452d", label: "Overnight", weight: 0 },
};

export const MATCH_LABEL: Record<OfficialMatch, string> = {
  on: "On official cycle route",
  alongside: "Alongside official route",
  off: "Off official cycle routes",
};
