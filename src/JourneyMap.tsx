import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { basemaps, type BasemapId } from "./data/basemap";
import { itineraryOf } from "./data/itineraries";
import { officialRouteOf } from "./data/officialRoutes";
import { regionOf, regions, stops, type RegionId, type Stop } from "./data/journey";
import { SEGMENT_STYLE, type Itinerary, type RideDay } from "./data/schema";

type Props = {
  activeId: string;
  regionFilter: RegionId | "all";
  mapLang: BasemapId;
  detail: boolean;
  dayId: string | "all";
  onSelect: (id: string) => void;
};

function visibleStops(filter: RegionId | "all"): Stop[] {
  return filter === "all" ? stops : stops.filter((s) => s.region === filter);
}

function dayOf(itinerary: Itinerary, dayId: string | "all"): RideDay | undefined {
  if (dayId === "all") return undefined;
  return itinerary.days.find((d) => d.id === dayId);
}

export default function JourneyMap({
  activeId,
  regionFilter,
  mapLang,
  detail,
  dayId,
  onSelect,
}: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const skipPan = useRef(true);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const active = useMemo(
    () => stops.find((s) => s.id === activeId) ?? stops[0],
    [activeId],
  );
  const itinerary = detail ? itineraryOf(activeId) : undefined;

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([36.5, 138.0], 5);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      tileRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileRef.current) {
      map.removeLayer(tileRef.current);
      tileRef.current = null;
    }

    const spec = basemaps[mapLang];
    const tiles = L.tileLayer(spec.url, {
      attribution: spec.attribution,
      maxZoom: spec.maxZoom,
    }).addTo(map);
    tileRef.current = tiles;
  }, [mapLang]);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    if (itinerary) {
      const focus = dayOf(itinerary, dayId);
      const allowedSeg = focus ? new Set(focus.segmentIds) : null;
      const allowedWp = focus ? new Set(focus.waypointIds) : null;

      for (const routeId of itinerary.officialRoutes) {
        const route = officialRouteOf(routeId);
        if (route.path.length < 2) continue;
        L.polyline(
          route.path.map(([lat, lng]) => L.latLng(lat, lng)),
          { color: "#2f6f6a", weight: 7, opacity: 0.28, lineCap: "round" },
        ).addTo(layer);
      }

      for (const seg of itinerary.segments) {
        if (allowedSeg && !allowedSeg.has(seg.id)) continue;
        if (seg.kind === "overnight" || seg.path.length < 2) continue;
        const style = SEGMENT_STYLE[seg.kind];
        L.polyline(
          seg.path.map(([lat, lng]) => L.latLng(lat, lng)),
          {
            color: style.color,
            weight: style.weight,
            opacity: 0.95,
            dashArray: style.dash,
            lineCap: "round",
          },
        ).addTo(layer);
      }

      for (const wp of itinerary.waypoints) {
        if (allowedWp && !allowedWp.has(wp.id)) continue;
        const overnight = wp.kind === "overnight";
        const marker = L.circleMarker([wp.lat, wp.lng], {
          radius: overnight ? 9 : 6,
          color: "#1a1814",
          weight: overnight ? 2 : 1,
          fillColor: overnight ? SEGMENT_STYLE.overnight.color : "#f3eee4",
          fillOpacity: 1,
        });
        marker.bindTooltip(
          `<strong>${wp.name}</strong>${overnight ? "<br/>Overnight" : ""}${wp.note ? `<br/>${wp.note}` : ""}`,
          { direction: "top", opacity: 0.95 },
        );
        marker.addTo(layer);
      }
      return;
    }

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
  }, [regionFilter, activeId, itinerary, dayId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (itinerary) {
      const focus = dayOf(itinerary, dayId);
      const wps = focus
        ? itinerary.waypoints.filter((w) => focus.waypointIds.includes(w.id))
        : itinerary.waypoints;
      const pts = wps.map((w) => L.latLng(w.lat, w.lng));
      if (pts.length >= 1) {
        map.fitBounds(L.latLngBounds(pts).pad(0.28), { animate: true });
      }
      return;
    }

    const shown = visibleStops(regionFilter);
    if (shown.length < 2) return;
    const bounds = L.latLngBounds(shown.map((s) => L.latLng(s.lat, s.lng)));
    map.fitBounds(bounds.pad(0.18), { animate: true });
  }, [regionFilter, itinerary, dayId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !active || itinerary) return;
    if (skipPan.current) {
      skipPan.current = false;
      return;
    }
    map.panTo([active.lat, active.lng], { animate: true, duration: 0.6 });
  }, [active, itinerary]);

  const legendKinds = itinerary
    ? [...new Set(itinerary.segments.map((s) => s.kind))]
    : null;

  return (
    <div className="map-shell">
      <div
        ref={mapEl}
        className="map-canvas"
        role="application"
        aria-label={
          itinerary
            ? `${itinerary.title} episode map`
            : mapLang === "en"
              ? "Japan bike journey map, English labels"
              : "Japan bike journey map, Japanese labels"
        }
      />
      <div className="map-legend">
        {legendKinds
          ? legendKinds.map((kind) => (
              <span key={kind} className="legend-item">
                <i
                  style={{
                    background: SEGMENT_STYLE[kind].color,
                    borderRadius: kind === "overnight" ? "2px" : "50%",
                  }}
                />
                {SEGMENT_STYLE[kind].label}
              </span>
            ))
          : regions.map((r) => (
              <span key={r.id} className="legend-item">
                <i style={{ background: r.color }} />
                {mapLang === "en" ? r.name : r.kana}
              </span>
            ))}
        {itinerary && itinerary.officialRoutes.length > 0 ? (
          <span className="legend-item">
            <i style={{ background: "#2f6f6a", width: 14, borderRadius: 2 }} />
            Official cycle route
          </span>
        ) : null}
      </div>
    </div>
  );
}
