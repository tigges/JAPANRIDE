# JAPANRIDE

A landing page that stitches [NHK WORLD-JAPAN *Cycle Around Japan*](https://www3.nhk.or.jp/nhkworld/en/shows/cycle/) into **one north-to-south Japan bike journey**.

**Live:** [https://japanride.pages.dev/](https://japanride.pages.dev/)

Episode titles, stills, and short descriptions come from the official catalog and listings. This site is an unofficial companion map, not affiliated with NHK.

## Run

```bash
npm ci
npm test
npm run dev
```

Open http://localhost:5173

## What it maps

Nine chapters from Shiretoko to Yaeyama, drawn from twelve years of rides (Hokkaido, Tohoku, Hokuriku, Kanto, Alps & Fuji, Kansai & Kii, Seto & San'in, Kyushu, Nansei Islands). Current NHK WORLD VOD episodes are linked out so you can watch from the map.

The map has **English** (Esri World Topo) and **日本語** (GSI pale) label modes. English is the default.

Six hubs open a **color-coded episode map** (Izu, Boso, Tsukuba, Biwa, Shimanami, Goto): lake, coast, pass, island, ferry, flight, overnight. Official National Cycle Routes show as a teal underlay where the ride is on them. The full-Japan dashed line stays a story spine.

Later, an original **JapanRide** traverse can sit as its own layer (`japanride`) on the official network, optionally splicing NHK episode days as detours — not as a replacement for this overview.
