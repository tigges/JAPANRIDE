import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { regionOf, regions, stops, type RegionId, type Stop } from "./data/journey";

type Props = {
  activeId: string;
  regionFilter: RegionId | "all";
  onSelect: (id: string) => void;
};

function visibleStops(filter: RegionId | "all"): Stop[] {
  return filter === "all" ? stops : stops.filter((s) => s.region === filter);
}

export default function JourneyMap({ activeId, regionFilter, onSelect }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const skipPan = useRef(true);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const active = useMemo(
    () => stops.find((s) => s.id === activeId) ?? stops[0],
    [activeId],
  );

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([36.5, 138.0], 5);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    const shown = visibleStops(regionFilter);
    const latlngs = shown.map((s) => L.latLng(s.lat, s.lng));

    L.polyline(latlngs, {
      color: "#c4452d",
      weight: 3,
      opacity: 0.85,
      dashArray: "7 8",
    }).addTo(layer);

    for (const stop of shown) {
      const region = regionOf(stop.region);
      const isActive = stop.id === activeId;
      const marker = L.circleMarker([stop.lat, stop.lng], {
        radius: isActive ? 9 : 6,
        color: "#1a1814",
        weight: isActive ? 2 : 1,
        fillColor: isActive ? "#c4452d" : region.color,
        fillOpacity: 1,
      });
      marker.bindTooltip(
        `<strong>${stop.name}</strong><br/>${stop.prefecture} · ${stop.year}`,
        { direction: "top", opacity: 0.95 },
      );
      marker.on("click", () => onSelectRef.current(stop.id));
      marker.addTo(layer);
    }
  }, [regionFilter, activeId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const shown = visibleStops(regionFilter);
    if (shown.length < 2) return;
    const bounds = L.latLngBounds(shown.map((s) => L.latLng(s.lat, s.lng)));
    map.fitBounds(bounds.pad(0.18), { animate: true });
  }, [regionFilter]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !active) return;
    if (skipPan.current) {
      skipPan.current = false;
      return;
    }
    map.panTo([active.lat, active.lng], { animate: true, duration: 0.6 });
  }, [active]);

  return (
    <div className="map-shell">
      <div ref={mapEl} className="map-canvas" role="application" aria-label="Japan bike journey map" />
      <div className="map-legend">
        {regions.map((r) => (
          <span key={r.id} className="legend-item">
            <i style={{ background: r.color }} />
            {r.kana}
          </span>
        ))}
      </div>
    </div>
  );
}
