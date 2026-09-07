import { useMemo, useState } from "react";
import JourneyMap from "./JourneyMap";
import { MAP_LANG_KEY, basemaps, isBasemapId, type BasemapId } from "./data/basemap";
import { hasItinerary, itineraryOf } from "./data/itineraries";
import { officialRouteOf } from "./data/officialRoutes";
import {
  JUMP_STYLE,
  isIslandTrip,
  jumpsTouching,
  type TourJump,
} from "./data/connectors";
import { MATCH_LABEL, SEGMENT_STYLE } from "./data/schema";
import {
  NHK_SHOW,
  regionOf,
  regions,
  stats,
  stops,
  stopsByRegion,
  type RegionId,
} from "./data/journey";
import { SITE_VERSION, siteVersionLabel } from "./data/version";
import { heroImages, vodEpisodes } from "./data/vod";

function formatMins(sec: number): string {
  return `${Math.round(sec / 60)} min`;
}

function hubName(id: string): string {
  return stops.find((s) => s.id === id)?.name ?? id;
}

function JumpNotes({ stopId }: { stopId: string }) {
  const { inbound, outbound } = jumpsTouching(stopId);
  if (inbound.length === 0 && outbound.length === 0) return null;

  function row(jump: TourJump, direction: "from" | "to", otherId: string) {
    const style = JUMP_STYLE[jump.kind];
    return (
      <li key={`${direction}-${jump.id}`}>
        <i style={{ background: style.color }} />
        <span>
          {style.label} {direction} {hubName(otherId)}
          {jump.note ? ` — ${jump.note}` : ""}
        </span>
      </li>
    );
  }

  return (
    <ul className="jump-notes">
      {inbound.map((jump) => row(jump, "from", jump.from))}
      {outbound.map((jump) => row(jump, "to", jump.to))}
    </ul>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState(stops[0]?.id ?? "shiretoko");
  const [regionFilter, setRegionFilter] = useState<RegionId | "all">("all");
  const [mapLang, setMapLang] = useState<BasemapId>(() => {
    try {
      const saved = localStorage.getItem(MAP_LANG_KEY);
      return isBasemapId(saved) ? saved : "en";
    } catch {
      return "en";
    }
  });
  const [detail, setDetail] = useState(false);
  const [dayId, setDayId] = useState<string | "all">("all");

  function chooseMapLang(id: BasemapId) {
    setMapLang(id);
    try {
      localStorage.setItem(MAP_LANG_KEY, id);
    } catch {
      /* ignore */
    }
  }

  const list = useMemo(
    () => (regionFilter === "all" ? stops : stopsByRegion(regionFilter)),
    [regionFilter],
  );
  const active = list.find((s) => s.id === activeId) ?? list[0] ?? stops[0]!;
  const itinerary = detail ? itineraryOf(active.id) : undefined;
  const japanVod = vodEpisodes.filter((e) => e.japan);
  const taiwanVod = vodEpisodes.filter((e) => !e.japan);

  function openHub(id: string, asDetail = hasItinerary(id)) {
    const stop = stops.find((s) => s.id === id);
    if (!stop) return;
    if (regionFilter !== "all" && stop.region !== regionFilter) {
      setRegionFilter("all");
    }
    setActiveId(id);
    setDetail(asDetail);
    setDayId("all");
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function pickStop(id: string) {
    openHub(id);
  }

  function chooseRegion(id: RegionId | "all") {
    setRegionFilter(id);
    setDetail(false);
    setDayId("all");
    if (id !== "all") {
      const first = stopsByRegion(id)[0];
      if (first) setActiveId(first.id);
    }
  }

  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <a className="wordmark" href="#top">
            JAPANRIDE
          </a>
          <span className="site-version" title="Increments with each site change">
            {siteVersionLabel()}
          </span>
        </div>
        <nav>
          <a href="#map">Map</a>
          <a href="#chapters">Chapters</a>
          <a href="#watch">Watch</a>
          <a href="#ride">Ride notes</a>
        </nav>
        <a className="nav-cta" href={NHK_SHOW} target="_blank" rel="noreferrer">
          NHK WORLD
        </a>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-img"
          src={heroImages.pc}
          alt="Cyclist on a forest road from Cycle Around Japan"
        />
        <div className="hero-veil" />
        <div className="hero-copy">
          <p className="eyebrow">Unofficial companion · NHK WORLD-JAPAN Cycle Around Japan</p>
          <h1>
            NHK episode rides,
            <em> mapped and watchable. </em>
          </h1>
          <p className="lede">
            This project maps and details the bicycle rides from Cycle Around Japan —
            every episode hub from Hokkaido to Yaeyama. Full Japan still shows all the
            rides and how you can get from one to the next. It is not a grand tour of
            Japan; that is a separate project. Open a hub for the episode days when we
            have them, then watch the segment on the official NHK site when it is listed.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#map">
              Open the map
            </a>
            <a className="btn ghost" href={NHK_SHOW} target="_blank" rel="noreferrer">
              Watch on NHK WORLD
            </a>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Series figures">
        <div>
          <b>{stats.years}</b>
          <span>on air</span>
        </div>
        <div>
          <b>{stops.length}</b>
          <span>mapped hubs</span>
        </div>
        <div>
          <b>~{stats.episodeCount}</b>
          <span>episodes</span>
        </div>
        <div>
          <b>{stats.typicalKm} km</b>
          <span>typical ride</span>
        </div>
        <div>
          <b>{stats.typicalDays} days</b>
          <span>per episode</span>
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="section-head">
          <p className="eyebrow">Every NHK ride on one map</p>
          <h2>All the rides, and how you get from one to the next</h2>
          <p>
            Full Japan shows every Cycle Around Japan hub. Colored lines are hops
            between episodes — vermillion ride, gold train, purple ferry, grey flight —
            not one continuous tour. Island episodes (Sado, Niijima, Goto, Yakushima,
            Amami, Okinawa, Miyako, Yaeyama) hang off ferry or flight gateways. Hubs
            marked route open a color-coded episode map. Watch this ride opens NHK
            WORLD when that segment is listed.
          </p>
        </div>

        <div className="map-toolbar">
          <div className="region-pills" role="tablist" aria-label="Filter rides by region">
            <button
              className={regionFilter === "all" ? "pill on" : "pill"}
              onClick={() => chooseRegion("all")}
            >
              Full Japan
            </button>
            {regions.map((r) => (
              <button
                key={r.id}
                className={regionFilter === r.id ? "pill on" : "pill"}
                onClick={() => chooseRegion(r.id)}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="lang-pills" role="radiogroup" aria-label="Map labels">
            <span className="lang-label">Map labels</span>
            {(Object.keys(basemaps) as BasemapId[]).map((id) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={mapLang === id}
                className={mapLang === id ? "pill on" : "pill"}
                onClick={() => chooseMapLang(id)}
              >
                {basemaps[id].label}
              </button>
            ))}
          </div>
        </div>

        <div className="map-layout">
          <JourneyMap
            activeId={active.id}
            regionFilter={regionFilter}
            mapLang={mapLang}
            detail={detail}
            dayId={dayId}
            onSelect={(id) => openHub(id)}
          />
          <aside className={itinerary ? "stop-panel is-detail" : "stop-panel"}>
            <div className="stop-head">
              <p className="stop-kicker">
                {regionOf(active.region).kana} · {active.year}
                {isIslandTrip(active.id) ? " · Island episode" : " · Mainland episode"}
                {hasItinerary(active.id) ? " · Detailed ride" : ""}
              </p>
              <h3>{active.name}</h3>
              <p className="stop-pref">{active.prefecture}</p>
              <p className="stop-ep">
                Episode: <em>{active.episode}</em>
                {active.kmHint ? ` · ~${active.kmHint} km` : ""}
              </p>
            {hasItinerary(active.id) ? (
              <div className="detail-toggle">
                <button
                  type="button"
                  className={detail ? "pill on" : "pill"}
                  onClick={() => {
                    setDetail(true);
                    setDayId("all");
                  }}
                >
                  Episode map
                </button>
                <button
                  type="button"
                  className={!detail ? "pill on" : "pill"}
                  onClick={() => {
                    setDetail(false);
                    setDayId("all");
                  }}
                >
                  All rides
                </button>
                </div>
              ) : null}
            </div>
            <div className="stop-body">
              {itinerary ? (
                <div className="itinerary">
                <p className="muted tight">{itinerary.disclaimer}</p>
                {itinerary.officialRoutes.length > 0 ? (
                  <p className="official-chip">
                    {itinerary.officialRoutes.map((id) => officialRouteOf(id).name).join(" · ")}
                  </p>
                ) : (
                  <p className="official-chip off">{MATCH_LABEL.off}</p>
                )}
                <div className="day-pills" role="tablist" aria-label="Episode days">
                  <button
                    className={dayId === "all" ? "pill on" : "pill"}
                    onClick={() => setDayId("all")}
                  >
                    All days
                  </button>
                  {itinerary.days.map((d) => (
                    <button
                      key={d.id}
                      className={dayId === d.id ? "pill on" : "pill"}
                      onClick={() => setDayId(d.id)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <ol className="day-list">
                  {itinerary.days
                    .filter((d) => dayId === "all" || d.id === dayId)
                    .map((d) => (
                      <li key={d.id}>
                        <strong>
                          {d.label} — {d.title}
                        </strong>
                        <ul>
                          {d.segmentIds.map((sid) => {
                            const seg = itinerary.segments.find((s) => s.id === sid);
                            if (!seg) return null;
                            const from = itinerary.waypoints.find((w) => w.id === seg.from);
                            const to = itinerary.waypoints.find((w) => w.id === seg.to);
                            const style = SEGMENT_STYLE[seg.kind];
                            return (
                              <li key={seg.id}>
                                <i style={{ background: style.color }} />
                                <span>
                                  {seg.kind === "overnight"
                                    ? `Overnight in ${from?.name ?? ""}`
                                    : `${from?.name ?? ""} → ${to?.name ?? ""}`}
                                  <small>
                                    {style.label}
                                    {seg.km ? ` · ~${seg.km} km` : ""} · {MATCH_LABEL[seg.official]}
                                    {seg.note ? ` · ${seg.note}` : ""}
                                  </small>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                </ol>
              </div>
              ) : (
                <>
                  <p className="stop-summary">{active.summary}</p>
                  <JumpNotes stopId={active.id} />
                  <ul className="chips">
                    {active.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <ol className="stop-list">
                    {list.map((stop, i) => (
                      <li key={stop.id}>
                        <button
                          className={stop.id === active.id ? "stop-row on" : "stop-row"}
                          onClick={() => openHub(stop.id)}
                        >
                          <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                          <span>
                            <strong>
                              {stop.name}
                              {hasItinerary(stop.id) ? <em className="route-mark"> route</em> : null}
                              {isIslandTrip(stop.id) ? <em className="island-mark"> island</em> : null}
                            </strong>
                            <small>
                              {stop.prefecture} · {stop.year}
                            </small>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
            <div className="stop-foot">
              {active.vodId ? (
                <a
                  className="btn primary slim"
                  href={`https://www3.nhk.or.jp/nhkworld/en/shows/${active.vodId}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch this ride
                </a>
              ) : (
                <p className="muted">
                  This segment is not on NHK WORLD VOD right now — availability rotates.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="chapters" id="chapters">
        <div className="section-head">
          <p className="eyebrow">Nine chapters of episode rides</p>
          <h2>Mainland rides and island episodes</h2>
        </div>
        <div className="chapter-grid">
          {regions.map((region, i) => {
            const chapterStops = stopsByRegion(region.id);
            return (
              <article key={region.id} className="chapter">
                <header>
                  <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>
                    {region.name} <small>{region.kana}</small>
                  </h3>
                </header>
                <p>{region.tagline}</p>
                <ul>
                  {chapterStops.map((s) => (
                    <li key={s.id}>
                      <button onClick={() => pickStop(s.id)}>{s.name}</button>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="watch" id="watch">
        <div className="section-head">
          <p className="eyebrow">On NHK WORLD now</p>
          <h2>Watch each ride on the official site</h2>
          <p>
            Titles, stills, and captions come from the official Cycle Around Japan catalog.
            Availability rotates — Watch this ride on a hub, or open a card here, to play
            on NHK WORLD-JAPAN when that segment is listed.
          </p>
        </div>
        <div className="vod-grid">
          {japanVod.map((ep) => (
            <a key={ep.id} className="vod-card" href={ep.url} target="_blank" rel="noreferrer">
              <img src={ep.hero} alt="" />
              <div>
                <span className={`kind ${ep.kind}`}>{ep.kind}</span>
                <h3>{ep.title}</h3>
                <p>{ep.description}</p>
                <small>{formatMins(ep.durationSec)}</small>
              </div>
            </a>
          ))}
        </div>

        <div className="taiwan">
          <h3>Sister ride — Cycle Around Taiwan</h3>
          <p>
            Three 2025 specials leave Japan for Taipei, indigenous east-coast
            roads, and the island's southern tip.
          </p>
          <div className="vod-row">
            {taiwanVod.map((ep) => (
              <a key={ep.id} className="vod-mini" href={ep.url} target="_blank" rel="noreferrer">
                <img src={ep.hero} alt="" />
                <span>{ep.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ride" id="ride">
        <div className="section-head">
          <p className="eyebrow">From the transcripts</p>
          <h2>How the series actually rides</h2>
        </div>
        <div className="notes">
          <article>
            <h3>Four days, then a train</h3>
            <p>
              A typical episode is 250–400 km over three or four days. When the mountains close
              in — Kii, Hidaka, the Alps — the rider takes the train and starts climbing again.
              The show is honest about that. So is this map.
            </p>
          </article>
          <article>
            <h3>Stay with the work</h3>
            <p>
              The camera stops for people: a salt maker spreading seawater on Noto sand, a
              Goto couple keeping a World Heritage church, Sakai knifemakers, Wajima's
              temporary morning market after the 2024 quake. The road is the excuse.
            </p>
          </article>
          <article>
            <h3>Begin where you land</h3>
            <p>
              Several rides start at the airport or the capital — Narita onto Boso, Tokyo to
              Izu-Oshima, Osaka into Nara's steepest road. You do not need a support van to
              copy the spirit of a chapter.
            </p>
          </article>
          <article>
            <h3>Island episodes stay episodes</h3>
            <p>
              Sado, the Izu islands, Goto, Yakushima, Amami, and the Ryukyus are their
              own NHK trips — ferry or flight from a gateway, then a loop. This map
              shows how you reach them from neighboring episode hubs; they are not
              stages of a grand tour.
            </p>
          </article>
        </div>
        <blockquote>
          “The best way to discover little-known sights, and make even familiar places feel
          brand new, is to go exploring by bicycle.”
          <cite>Cycle Around Japan opening · NHK WORLD-JAPAN</cite>
        </blockquote>
      </section>

      <footer className="foot">
        <div>
          <strong>JAPANRIDE</strong>
          <p>
            An unofficial map of Cycle Around Japan episode rides. Not affiliated with
            NHK. Episode titles, stills, and descriptions belong to NHK WORLD-JAPAN.
            Watch each segment on the official site when it is available.
          </p>
          <p className="site-version-foot">Site version {SITE_VERSION}</p>
        </div>
        <a className="btn ghost" href={NHK_SHOW} target="_blank" rel="noreferrer">
          Cycle Around Japan ↗
        </a>
      </footer>
    </div>
  );
}
