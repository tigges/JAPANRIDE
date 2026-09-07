import type { LatLng, OfficialRouteId } from "./schema";

export type OfficialRoute = {
  id: OfficialRouteId;
  name: string;
  nameJa: string;
  kind: "national" | "prefectural";
  note: string;
  /** Simplified sketch of the route near our pilot episodes — not a survey line. */
  path: LatLng[];
};

export const officialRoutes: OfficialRoute[] = [
  {
    id: "shimanami",
    name: "Shimanami Kaido",
    nameJa: "しまなみ海道",
    kind: "national",
    note: "National Cycle Route: Onomichi–Imabari bridge chain.",
    path: [
      [34.409, 133.199],
      [34.365, 133.204],
      [34.32, 133.19],
      [34.284, 133.175],
      [34.303, 133.089],
      [34.27, 133.05],
      [34.248, 133.027],
      [34.207, 133.083],
      [34.17, 133.023],
      [34.116, 132.984],
      [34.066, 132.998],
    ],
  },
  {
    id: "biwaichi",
    name: "Biwaichi",
    nameJa: "ビワイチ",
    kind: "national",
    note: "National Cycle Route: loop of Lake Biwa.",
    path: [
      [35.017, 135.855],
      [35.06, 135.88],
      [35.118, 135.911],
      [35.25, 136.02],
      [35.417, 136.033],
      [35.4, 136.2],
      [35.381, 136.275],
      [35.277, 136.26],
      [35.128, 136.098],
      [35.017, 135.96],
      [35.017, 135.855],
    ],
  },
  {
    id: "rinrin",
    name: "Tsukuba-Kasumigaura Rinrin Road",
    nameJa: "つくば霞ヶ浦りんりんロード",
    kind: "national",
    note: "National Cycle Route around Kasumigaura.",
    path: [
      [36.083, 140.077],
      [36.078, 140.204],
      [36.09, 140.237],
      [36.04, 140.32],
      [35.99, 140.49],
      [35.935, 140.555],
      [36.004, 140.302],
      [36.066, 140.228],
      [36.083, 140.077],
    ],
  },
  {
    id: "pacific-coast",
    name: "Pacific Coast Cycle Road",
    nameJa: "太平洋岸自転車道",
    kind: "national",
    note: "National Cycle Route; Boso outer coast is the local piece drawn here.",
    path: [
      [35.191, 140.349],
      [35.144, 140.311],
      [35.11, 140.098],
      [35.04, 139.9],
      [34.996, 139.87],
      [35.043, 139.84],
    ],
  },
  {
    id: "toyama-bay",
    name: "Toyama Bay Cycling Course",
    nameJa: "富山湾岸サイクリングコース",
    kind: "national",
    note: "National Cycle Route. Not in this pilot set; reserved for a later Hokuriku pass.",
    path: [],
  },
  {
    id: "tokapuchi400",
    name: "Tokapuchi 400",
    nameJa: "トカプチ400",
    kind: "national",
    note: "National Cycle Route in Tokachi. Not in this pilot set.",
    path: [],
  },
];

export function officialRouteOf(id: OfficialRouteId): OfficialRoute {
  const route = officialRoutes.find((r) => r.id === id);
  if (!route) throw new Error(`Unknown official route: ${id}`);
  return route;
}
