export type BasemapId = "en" | "ja";

export type Basemap = {
  id: BasemapId;
  label: string;
  url: string;
  attribution: string;
  maxZoom: number;
};

/** Key-free raster basemaps. Carto Voyager watermarks without an API key. */
export const basemaps: Record<BasemapId, Basemap> = {
  en: {
    id: "en",
    label: "English",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
    maxZoom: 18,
  },
  ja: {
    id: "ja",
    label: "日本語",
    url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    attribution:
      '<a href="https://maps.gsi.go.jp/development/ichiran.html">Geospatial Information Authority of Japan</a>',
    maxZoom: 18,
  },
};

export const MAP_LANG_KEY = "japanride-map-lang";

export function isBasemapId(value: string | null): value is BasemapId {
  return value === "en" || value === "ja";
}
