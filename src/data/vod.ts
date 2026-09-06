export type VodEpisode = {
  id: string;
  title: string;
  description: string;
  url: string;
  firstBroadcastedAt: string;
  durationSec: number;
  hero: string;
  japan: boolean;
  kind: "feature" | "landscape" | "special";
  captions: string[];
};

const img = (path: string) => `https://www3.nhk.or.jp${path}`;

/** Currently listed on NHK WORLD-JAPAN Cycle Around Japan VOD (Sept 2026). */
export const vodEpisodes: VodEpisode[] = [
  {
    id: "2066090",
    title: "Miyagi & Yamagata — Glowing with Greenery",
    description:
      "Early-summer color: shijimi clams, bamboo shoots, and a paddling path through a submerged forest.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066090/",
    firstBroadcastedAt: "2026-07-18T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066090/images/wide_l_whptCGRqdh873ocH19VtE77T3bmK1yCgF8NCZp0A.jpg"),
    japan: true,
    kind: "feature",
    captions: [
      "Shijimi at the mouth of the Abukuma",
      "Takenoko in Marumori",
      "Kaminoyama cherries",
      "Lake Shirakawa's submerged forest",
    ],
  },
  {
    id: "2066089",
    title: "Ibaraki & Tochigi — The Bounties of Spring",
    description:
      "Sweet bell peppers in Kamisu, sod farms in Tsukuba, and a restored motorcycle carrying a town's pride.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066089/",
    firstBroadcastedAt: "2026-06-20T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066089/images/wide_l_9cSLnGz8UIxhaOD37ZXC6gvMr10erG7YB6F9fcJj.jpg"),
    japan: true,
    kind: "feature",
    captions: [
      "Japan's largest piman harvest",
      "Tsukuba sod country",
      "A restored classic in Nasukarasuyama",
    ],
  },
  {
    id: "2066088",
    title: "Oita — Warming Body and Soul",
    description:
      "Beppu's duck race, an artist in Saganoseki, and the Yamanami Highway through the mountains.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066088/",
    firstBroadcastedAt: "2026-05-23T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066088/images/wide_l_a0Kmbwe059neCozgugczjrdUKxKxduhB33Rd8F3p.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Beppu duck race", "Saganoseki art", "Yamanami Highway"],
  },
  {
    id: "2066087",
    title: "Okayama — Charming Rustic Warmth",
    description:
      "Horseshoe crabs in Kasaoka, a stone-quarry island, and a temple of woodblock prints.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066087/",
    firstBroadcastedAt: "2026-04-18T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066087/images/wide_l_bIxi4F7T9aeolKoHu20m3oGfy6FKCeVzYDaZBqxo.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Kasaoka horseshoe crabs", "Kitagishima quarry", "Inland Sea sunset"],
  },
  {
    id: "2066086",
    title: "Beginners' Rides",
    description:
      "Yokosuka sukajan, a steep Izu pass, Heda's deep-sea fish, and a 110 km Fukushima long-ride.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066086/",
    firstBroadcastedAt: "2026-02-21T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066086/images/wide_l_7ewscf8P0NIB2zULEliijQzTWQea0IN3PZlZludE.jpg"),
    japan: true,
    kind: "special",
    captions: ["Yokosuka sukajan", "Izu pass", "Fukushima 110 km event"],
  },
  {
    id: "2066085",
    title: "Goto Islands — Chain of Hospitality",
    description:
      "Camellia gin, a World Heritage church, and sixteen islanders still holding an autumn festival.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066085/",
    firstBroadcastedAt: "2026-01-24T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066085/images/wide_l_KaPgx1FpjlBGVFkJklsyRxYUOsfswywsW7yqSIGg.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Camellia gin", "Hidden Christians", "Mt. Onidake"],
  },
  {
    id: "2066084",
    title: "Noto — A Resilient Peninsula",
    description:
      "Kanazawa to Suzu after the 2024 quake: a temporary market, sun-dried salt, kabura-zushi.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066084/",
    firstBroadcastedAt: "2025-12-27T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066084/images/wide_l_vmhSC8q7eyQthWXypSZ2r6WsA5dgPegaaFS2iUe1.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Wajima morning market", "Sun-dried salt", "Kabura-zushi"],
  },
  {
    id: "2066072",
    title: "Shizuoka — Energy of the Forest",
    description:
      "Timber trails, the birthplace of wasabi, tea hills, and a fisherman's catch eaten at sea.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066072/",
    firstBroadcastedAt: "2024-09-21T02:10:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066072/images/wide_l_1uNoLF55F2BrGAHPNupyIJjxLiFJr8gJRUgGIV3U.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Wasabi forests", "Mountain perch", "Shizuoka tea"],
  },
  {
    id: "2066070",
    title: "Yatsugatake — Riding High",
    description:
      "Horseback school, prehistoric cooking, a star-gazing forest, and Fuji on the highland horizon.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066070/",
    firstBroadcastedAt: "2024-09-14T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066070/images/wide_l_RBPVxAEDqwzqbXZ8bATFlFyWWG6uYkLtNghXR9OY.jpg"),
    japan: true,
    kind: "feature",
    captions: ["Horseback kids", "Prehistoric pots", "Highland Fuji"],
  },
  {
    id: "2066071",
    title: "Best of the Best — Our Most Scenic Rides",
    description:
      "Viewers ranked ten favorite rides. Oita mountains, Nagano autumn, and a bridge over the sea.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066071/",
    firstBroadcastedAt: "2024-10-19T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066071/images/wide_l_tRWPGQmJJcpW4HCBMdeD34YlvlvBTF0ZfFzQKc7r.jpg"),
    japan: true,
    kind: "special",
    captions: ["Oita mountain road", "Nagano autumn", "Island-to-island bridge"],
  },
  {
    id: "5177001",
    title: "Landscapes from the Saddle: Tohoku",
    description: "Akita swans, Tsugaru canola under Mt. Iwaki, and the Hotokegaura coast.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/5177001/",
    firstBroadcastedAt: "2025-01-01T00:00:00Z",
    durationSec: 900,
    hero: img("/nhkworld/en/shows/5177001/images/wide_l_dAfOODwgAxm5vcKzQdZZBxS48LYrpjdk7h1dgqZs.jpg"),
    japan: true,
    kind: "landscape",
    captions: ["Akita swans", "Mt. Iwaki", "Hotokegaura"],
  },
  {
    id: "5177002",
    title: "Landscapes from the Saddle: Western Honshu",
    description: "Yamaguchi island alleys, Suo-Oshima beaches, and the Izumo Highway post town of Shinjo.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/5177002/",
    firstBroadcastedAt: "2025-01-01T00:00:00Z",
    durationSec: 900,
    hero: img("/nhkworld/en/shows/5177002/images/wide_l_rNMMGqn2BZO4QgAI7lxb2P833UULsrdUl8v4puxB.jpg"),
    japan: true,
    kind: "landscape",
    captions: ["Iwaishima alleys", "Shinjo post town", "Himeji Castle"],
  },
  {
    id: "2066081",
    title: "Cycle Around Taiwan — Colorful Cultural Charms",
    description: "Taipei and the west coast: Oriental Beauty tea, Yuanli rush-weed hats, Hanbao sunsets.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066081/",
    firstBroadcastedAt: "2025-09-20T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066081/images/wide_l_UpDxwa6xijD0THUkJrJQj1nuozhP7kRXtER7huk1.jpg"),
    japan: false,
    kind: "feature",
    captions: ["Oriental Beauty tea", "Rush-weed craft", "Hanbao Wetland"],
  },
  {
    id: "2066082",
    title: "Cycle Around Taiwan — A World of Indigenous Wonders",
    description: "Rukai forest keepers, Bunun chorus, Truku cane baskets, and the east-coast road.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066082/",
    firstBroadcastedAt: "2025-10-18T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066082/images/wide_l_DMxiIftgrP1g6eJlxjav5cmXGcayTzCO584TE45W.jpg"),
    japan: false,
    kind: "feature",
    captions: ["Rukai forest", "Bunun chorus", "East-coast ride"],
  },
  {
    id: "2066083",
    title: "Cycle Around Taiwan — Into the Future, Together",
    description: "Meinong water snowflake, Paiwan hostel family, dragon-tiger grouper, southernmost point.",
    url: "https://www3.nhk.or.jp/nhkworld/en/shows/2066083/",
    firstBroadcastedAt: "2025-11-22T00:00:00Z",
    durationSec: 2940,
    hero: img("/nhkworld/en/shows/2066083/images/wide_l_WRaRQAimaQcbmA7UtSrJULlRGFZWTVyJa41p0Tll.jpg"),
    japan: false,
    kind: "feature",
    captions: ["Meinong ponds", "Paiwan textiles", "Taiwan's southern tip"],
  },
];

export const heroImages = {
  pc: img(
    "/nhkworld/en/shows/cycle/images/hero_pc_l_y9falkylv2jJf7VuwCfoJKBXGLDXA6BpEIhhBu3h.jpg",
  ),
  sp: img(
    "/nhkworld/en/shows/cycle/images/hero_sp_l_ur7l01Qt3y1TrmCbiu9l5ZumkNzlnTl14nu6HGFO.jpg",
  ),
  landscape: img(
    "/nhkworld/en/shows/cycle/images/wide_l_8pr5aKhK57o4sNJMt31MQwUkJ7kK4xTHA1uJxc6e.jpg",
  ),
  logo: img(
    "/nhkworld/en/shows/cycle/images/logo_pc_9ggQ6goqdmuU3GldzEj8zCU4GnZqOwf3Xqyx0ZHM.png",
  ),
};

export function episodeById(id: string): VodEpisode | undefined {
  return vodEpisodes.find((e) => e.id === id);
}
