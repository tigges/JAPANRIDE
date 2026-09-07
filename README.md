# JAPANRIDE

A landing page that maps [NHK WORLD-JAPAN *Cycle Around Japan*](https://www3.nhk.or.jp/nhkworld/en/shows/cycle/) as a **library of tours**: a land spine from Shiretoko to Kagoshima, plus independent island trips.

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

Nine chapters from Shiretoko to Yaeyama, drawn from twelve years of rides (Hokkaido, Tohoku, Hokuriku, Kanto, Alps & Fuji, Kansai & Kii, Seto & San'in, Kyushu, Nansei Islands). The **land spine** ends at Kagoshima. Southwestern and other island episodes (Sado, Niijima, Goto, Yakushima, Amami, Okinawa, Miyako, Yaeyama) are separate packages reached by ferry or flight. Current NHK WORLD VOD episodes are linked out so you can watch from the map.

The map has **English** (Esri World Topo) and **日本語** (GSI pale) label modes. English is the default.

Overview links between hubs are **color-coded jumps**: vermillion ride, gold train, purple ferry, grey flight — so the catalog does not look like one continuous GPS ride.

Thirteen hubs open a **color-coded episode map** (Tokachi/Kushiro, Aomori, Toyama, Noto, Sado, Izu, Boso, Tsukuba, Biwa, Okayama, Shimanami, Oita, Goto): lake, coast, pass, island, ferry, flight, overnight. Official cycle routes show as a teal underlay where the ride is on them. Noto opens from both Kanazawa and Wajima.

Later, an original **JapanRide** traverse can sit as its own layer (`japanride`) on the official network, optionally splicing NHK episode days as detours — not as a replacement for this overview.
