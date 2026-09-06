/** Key-free raster basemaps. Carto Voyager watermarks without an API key. */
export const primaryBasemap = {
  url: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
  attribution:
    '<a href="https://maps.gsi.go.jp/development/ichiran.html">Geospatial Information Authority of Japan</a>',
  maxZoom: 18,
};

export const fallbackBasemap = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  attribution: "Tiles &copy; Esri",
  maxZoom: 18,
};
