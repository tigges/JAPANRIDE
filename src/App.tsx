import { useMemo, useState } from "react";
import JourneyMap from "./JourneyMap";
import { MAP_LANG_KEY, basemaps, isBasemapId, type BasemapId } from "./data/basemap";
import {
  NHK_SHOW,
  regionOf,
  regions,
  stats,
  stops,
  stopsByRegion,
  type RegionId,
} from "./data/journey";
import { heroImages, vodEpisodes } from "./data/vod";

function formatMins(sec: number): string {
  return `${Math.round(sec / 60)} min`;
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
  const japanVod = vodEpisodes.filter((e) => e.japan);
  const taiwanVod = vodEpisodes.filter((e) => !e.japan);

  function pickStop(id: string) {
    const stop = stops.find((s) => s.id === id);
    if (!stop) return;
    if (regionFilter !== "all" && stop.region !== regionFilter) {
      setRegionFilter("all");
    }
    setActiveId(id);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="wordmark" href="#top">
          JAPANRIDE
        </a>
        <nav>
          <a href="#map">Journey</a>
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
          <p className="eyebrow">Mapped from NHK WORLD-JAPAN · Cycle Around Japan</p>
          <h1>
            One island chain.
            <em> One saddle. </em>
            Twelve years of hidden Japan.
          </h1>
          <p className="lede">
            From the ice edge of Shiretoko to the coral of Yaeyama, every Cycle Around Japan
            ride is stitched here into a single north-to-south journey — locals, crafts, onsen,
            and the roads between.
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

      <section className="stats" aria-label="Journey figures">
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
          <p className="eyebrow">The grand traverse</p>
          <h2>Shiretoko → Yaeyama</h2>
          <p>
            Filter a region, then click a hub. The line is a story order — north to south —
            not a GPS trace. Ferries and trains fill the gaps, the way the series always has.
          </p>
        </div>

        <div className="map-toolbar">
          <div className="region-pills" role="tablist" aria-label="Filter journey by region">
            <button
              className={regionFilter === "all" ? "pill on" : "pill"}
              onClick={() => setRegionFilter("all")}
            >
              Full Japan
            </button>
            {regions.map((r) => (
              <button
                key={r.id}
                className={regionFilter === r.id ? "pill on" : "pill"}
                onClick={() => {
                  setRegionFilter(r.id);
                  const first = stopsByRegion(r.id)[0];
                  if (first) setActiveId(first.id);
                }}
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
            onSelect={setActiveId}
          />
          <aside className="stop-panel">
            <p className="stop-kicker">
              {regionOf(active.region).kana} · {active.year}
            </p>
            <h3>{active.name}</h3>
            <p className="stop-pref">{active.prefecture}</p>
            <p className="stop-summary">{active.summary}</p>
            <ul className="chips">
              {active.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="stop-ep">
              Episode: <em>{active.episode}</em>
              {active.kmHint ? ` · ~${active.kmHint} km` : ""}
            </p>
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
              <p className="muted">Full episode rotates on NHK WORLD VOD.</p>
            )}
            <ol className="stop-list">
              {list.map((stop, i) => (
                <li key={stop.id}>
                  <button
                    className={stop.id === active.id ? "stop-row on" : "stop-row"}
                    onClick={() => setActiveId(stop.id)}
                  >
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{stop.name}</strong>
                      <small>
                        {stop.prefecture} · {stop.year}
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="chapters" id="chapters">
        <div className="section-head">
          <p className="eyebrow">Nine chapters, one Japan</p>
          <h2>How the episodes become a route</h2>
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
          <h2>Stream the current rides</h2>
          <p>
            Titles, stills, and captions come from the official Cycle Around Japan catalog.
            Availability rotates — open NHK WORLD-JAPAN to play.
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
            Three 2025 specials leave the Japan traverse for Taipei, indigenous east-coast
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
            An unofficial companion map. Not affiliated with NHK. Episode titles, stills, and
            descriptions belong to NHK WORLD-JAPAN. Watch the series on the official site.
          </p>
        </div>
        <a className="btn ghost" href={NHK_SHOW} target="_blank" rel="noreferrer">
          Cycle Around Japan ↗
        </a>
      </footer>
    </div>
  );
}
