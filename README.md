# JAPANRIDE

An unofficial companion that **maps and details the bicycle rides** from [NHK WORLD-JAPAN *Cycle Around Japan*](https://www3.nhk.or.jp/nhkworld/en/shows/cycle/), and links out so you can **watch each segment on the NHK site** when it is listed.

Full Japan still shows **every episode hub** and **how you can get from one ride to the next** (ride, train, ferry, or flight). That catalog layout is not a grand tour of Japan — a continuous original traverse is a **separate project**.

**Live:** [https://japanride.pages.dev/](https://japanride.pages.dev/)

Episode titles, stills, and short descriptions come from the official catalog and listings. This site is not affiliated with NHK.

## Run

```bash
npm ci
npm test
npm run dev
```

Open http://localhost:5173

## GitHub Pages

[https://tigges.github.io/JAPANRIDE/](https://tigges.github.io/JAPANRIDE/) is a Vite app. It only works if GitHub Pages deploys the **built** `dist` from `.github/workflows/pages.yml`.

Repo **Settings → Pages → Build and deployment → Source** must be **GitHub Actions**, not “Deploy from a branch” (`main` /). Branch deploy publishes the unbuilt `index.html` (`/src/main.tsx`), which the browser cannot run — a white screen.

After switching to GitHub Actions, re-run the **Deploy GitHub Pages** workflow or push to `main`. The workflow already sets `BASE_PATH=/JAPANRIDE/`.

Until that setting is GitHub Actions, use [https://japanride.pages.dev/](https://japanride.pages.dev/).

## What it maps

Nine chapters from Shiretoko to Yaeyama, drawn from twelve years of *Cycle Around Japan* rides (Hokkaido, Tohoku, Hokuriku, Kanto, Alps & Fuji, Kansai & Kii, Seto & San'in, Kyushu, Nansei Islands). **Full Japan** plots every hub. Island episodes (Sado, Niijima, Goto, Yakushima, Amami, Okinawa, Miyako, Yaeyama) hang off ferry or flight gateways so they stay distinct trips, not stages of one land tour.

The map has **English** (Esri World Topo) and **日本語** (GSI pale) label modes. English is the default.

Links between hubs are **color-coded hops**: vermillion ride, gold train, purple ferry, grey flight — how you could get from one NHK episode to another, not a single GPS line.

Thirteen hubs open a **color-coded episode map** (Tokachi/Kushiro, Aomori, Toyama, Noto, Sado, Izu, Boso, Tsukuba, Biwa, Okayama, Shimanami, Oita, Goto): lake, coast, pass, island, ferry, flight, overnight. Official cycle routes show as a teal underlay where the ride is on them. Noto opens from both Kanazawa and Wajima. **Watch this ride** opens the NHK WORLD page when that hub has a listed VOD id.
