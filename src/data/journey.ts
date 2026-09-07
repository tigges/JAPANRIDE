export type RegionId =
  | "hokkaido"
  | "tohoku"
  | "hokuriku"
  | "kanto"
  | "alps"
  | "kansai"
  | "seto"
  | "kyushu"
  | "nansei";

export type Stop = {
  id: string;
  name: string;
  prefecture: string;
  region: RegionId;
  lat: number;
  lng: number;
  kmHint?: number;
  episode: string;
  year: number;
  summary: string;
  highlights: string[];
  vodId?: string;
};

export type Region = {
  id: RegionId;
  order: number;
  name: string;
  kana: string;
  tagline: string;
  color: string;
};

export const NHK_ORIGIN = "https://www3.nhk.or.jp";
export const NHK_SHOW = `${NHK_ORIGIN}/nhkworld/en/shows/cycle/`;

export const regions: Region[] = [
  {
    id: "hokkaido",
    order: 1,
    name: "Hokkaido",
    kana: "北海道",
    tagline: "Lavender plains, Ainu craft, and the long northern light.",
    color: "#3d6b8a",
  },
  {
    id: "tohoku",
    order: 2,
    name: "Tohoku",
    kana: "東北",
    tagline: "Cold winds, warm hearts, and coasts rebuilt with stubborn joy.",
    color: "#2f5d50",
  },
  {
    id: "hokuriku",
    order: 3,
    name: "Hokuriku",
    kana: "北陸",
    tagline: "Sea of Japan highways, gold-island Noh, and Noto's recovery.",
    color: "#4a6b3a",
  },
  {
    id: "kanto",
    order: 4,
    name: "Kanto",
    kana: "関東",
    tagline: "From Narita's fields to Nikko's forest shrines and Tokyo's back alleys.",
    color: "#c4452d",
  },
  {
    id: "alps",
    order: 5,
    name: "Alps & Fuji",
    kana: "中部",
    tagline: "Wasabi forests, Yatsugatake highlands, and the Nakasendo.",
    color: "#6b4a2f",
  },
  {
    id: "kansai",
    order: 6,
    name: "Kansai & Kii",
    kana: "関西",
    tagline: "Lake Biwa to sacred Koyasan — cuisine, crafts, and climbing with a smile.",
    color: "#8a3d5c",
  },
  {
    id: "seto",
    order: 7,
    name: "Seto & San'in",
    kana: "瀬戸内・山陰",
    tagline: "Island-hopping bridges, Izumo legends, and Inland Sea kindness.",
    color: "#2f4a6b",
  },
  {
    id: "kyushu",
    order: 8,
    name: "Kyushu",
    kana: "九州",
    tagline: "Hot-spring souls, hidden Christians, volcanoes, and sugar roads.",
    color: "#8a5a2b",
  },
  {
    id: "nansei",
    order: 9,
    name: "Nansei Islands",
    kana: "南西諸島",
    tagline: "NHK island episodes — Yakushima cedars to Yaeyama coral.",
    color: "#1f6b62",
  },
];

/**
 * Cycle Around Japan episode hubs in catalog order (north to south).
 * Mainland hubs are sequenced so Full Japan can draw hops between neighboring
 * episodes; island episodes hang off ferry/flight gateways (see connectors.ts).
 * That sequence is a catalog layout, not a grand tour. Coordinates are
 * representative hubs, not GPS traces. Summaries are paraphrased from
 * NHK WORLD-JAPAN listings.
 */
export const stops: Stop[] = [
  {
    id: "shiretoko",
    name: "Shiretoko",
    prefecture: "Hokkaido",
    region: "hokkaido",
    lat: 44.07,
    lng: 145.11,
    kmHint: 470,
    episode: "Autumn: Amidst Mother Nature in Hokkaido",
    year: 2015,
    summary:
      "From Asahikawa toward the World Heritage peninsula, autumn color and the wild edge of Japan.",
    highlights: ["World Heritage coast", "Autumn ride from Asahikawa"],
  },
  {
    id: "kushiro",
    name: "Kushiro Wetlands",
    prefecture: "Hokkaido",
    region: "hokkaido",
    lat: 43.08,
    lng: 144.4,
    kmHint: 470,
    episode: "Hokkaido — Boundless Horizons",
    year: 2018,
    summary:
      "Tokachi plains and Kushiro marsh, Ainu art, and an open-air soak by Lake Kussharo.",
    highlights: ["Tokachi farmland", "Ainu culture", "Lake Kussharo onsen"],
  },
  {
    id: "furano",
    name: "Furano",
    prefecture: "Hokkaido",
    region: "hokkaido",
    lat: 43.34,
    lng: 142.38,
    episode: "Summer: A Journey Across Hokkaido",
    year: 2014,
    summary:
      "Lavender fields, Ainu encounters, and the first long northern ride of the series.",
    highlights: ["Lavender plains", "Local food", "Ainu craft"],
  },
  {
    id: "hakodate",
    name: "Hakodate",
    prefecture: "Hokkaido",
    region: "hokkaido",
    lat: 41.77,
    lng: 140.73,
    kmHint: 550,
    episode: "Southern Hokkaido — A Perfect Summer Ride",
    year: 2017,
    summary:
      "A 550 km summer crossing: kelp-drying villages, dairy country, and east-meets-west Hakodate.",
    highlights: ["Kombu drying", "Dairy farms", "Port city mix"],
    vodId: "2066069",
  },
  {
    id: "aomori",
    name: "Tsugaru & Shimokita",
    prefecture: "Aomori",
    region: "tohoku",
    lat: 40.82,
    lng: 140.75,
    episode: "Aomori — Cold Winds, Warm Hearts",
    year: 2024,
    summary:
      "Apple country, Tsugaru shamisen, scallop farms, and the sculpted rocks of Hotokegaura.",
    highlights: ["Hotokegaura coast", "Tsugaru shamisen", "Canola under Mt. Iwaki"],
    vodId: "2066068",
  },
  {
    id: "akita",
    name: "Kakunodate",
    prefecture: "Akita",
    region: "tohoku",
    lat: 39.6,
    lng: 140.56,
    kmHint: 330,
    episode: "Akita — The Wisdom of Nature",
    year: 2023,
    summary:
      "Samurai streets, weeping cherries, winter pickles, and 800-year lacquer born of hard snow.",
    highlights: ["Kakunodate samurai town", "Winter preserves", "Straw guardian deities"],
  },
  {
    id: "iwate",
    name: "Sanriku Coast",
    prefecture: "Iwate",
    region: "tohoku",
    lat: 39.45,
    lng: 141.96,
    episode: "Sanriku — A Coast Reborn",
    year: 2024,
    summary:
      "The shore hardest hit in 2011, now riding again — evening Hayachine, hill climbs, restored towns.",
    highlights: ["Post-tsunami recovery", "Mt. Hayachine", "Weekend training roads"],
  },
  {
    id: "miyagi",
    name: "Abukuma & Marumori",
    prefecture: "Miyagi",
    region: "tohoku",
    lat: 38.27,
    lng: 140.87,
    episode: "Miyagi & Yamagata — Glowing with Greenery",
    year: 2026,
    summary:
      "Early-summer color: river-mouth shijimi clams, bamboo shoots, and a coast that refused to stay broken.",
    highlights: ["Abukuma shijimi", "Takenoko in Marumori", "Unshaken coastal towns"],
    vodId: "2066090",
  },
  {
    id: "yamagata",
    name: "Dewa Sanzan",
    prefecture: "Yamagata",
    region: "tohoku",
    lat: 38.7,
    lng: 139.98,
    kmHint: 360,
    episode: "Yamagata — Seeking the Flavors of Autumn",
    year: 2024,
    summary:
      "Three sacred mountains, yamabushi trails, edible chrysanthemums, and a submerged forest on Lake Shirakawa.",
    highlights: ["Dewa pilgrimage", "Kaminoyama cherries", "Lake Shirakawa paddling"],
    vodId: "2066090",
  },
  {
    id: "aizu",
    name: "Aizu",
    prefecture: "Fukushima",
    region: "tohoku",
    lat: 37.49,
    lng: 139.93,
    kmHint: 300,
    episode: "Aizu — A Tapestry of Tradition",
    year: 2018,
    summary:
      "Mountain samurai code, peach orchards after 2011, and a 110 km beginners' long-ride through autumn hills.",
    highlights: ["Samurai horse riding", "Rebuilt seaside inns", "Beginners' 110 km event"],
    vodId: "2066086",
  },
  {
    id: "niigata",
    name: "Niigata rice country",
    prefecture: "Niigata",
    region: "hokuriku",
    lat: 37.92,
    lng: 139.04,
    kmHint: 250,
    episode: "Niigata — An Older, Simpler Way of Life",
    year: 2024,
    summary:
      "Hammered copper, nishikigoi, spicy daikon rolls, and straw cat-houses in the deep green of summer.",
    highlights: ["Nishikigoi breeders", "River fishing", "Lacquer craft"],
  },
  {
    id: "sado",
    name: "Sado Island",
    prefecture: "Niigata",
    region: "hokuriku",
    lat: 38.02,
    lng: 138.37,
    episode: "Sado — Island of Hidden Treasures",
    year: 2023,
    summary:
      "Gold-mine prosperity, living Noh, hangiri fishing boats, and the return of the crested ibis.",
    highlights: ["Sado Noh", "Crested ibis", "Schoolhouse sake brewery"],
  },
  {
    id: "toyama",
    name: "Gokayama",
    prefecture: "Toyama",
    region: "hokuriku",
    lat: 36.43,
    lng: 136.93,
    episode: "Autumn: Riding with the Wind in Toyama",
    year: 2016,
    summary:
      "Tateyama's wall of 3,000 m peaks, gassho farmhouses, and a 300-year festival in Yatsuo.",
    highlights: ["UNESCO gassho-zukuri", "Tateyama views", "Yatsuo festival"],
  },
  {
    id: "kanazawa",
    name: "Kanazawa",
    prefecture: "Ishikawa",
    region: "hokuriku",
    lat: 36.56,
    lng: 136.66,
    kmHint: 250,
    episode: "Noto — A Resilient Peninsula",
    year: 2025,
    summary:
      "The old castle-town gate to Noto — machiya streets, then Chirihama's 8 km of rideable sand.",
    highlights: ["Machiya townhouses", "Chirihama Beach ride", "Hokuriku Kaido"],
    vodId: "2066084",
  },
  {
    id: "wajima",
    name: "Wajima & Suzu",
    prefecture: "Ishikawa",
    region: "hokuriku",
    lat: 37.39,
    lng: 136.9,
    kmHint: 250,
    episode: "Noto — A Resilient Peninsula",
    year: 2025,
    summary:
      "After the 2024 quake: a temporary morning market, sun-dried salt, kabura-zushi, and a new coastal road.",
    highlights: ["Wajima morning market", "500-year salt method", "Kabura-zushi"],
    vodId: "2066084",
  },
  {
    id: "fukui",
    name: "Echizen",
    prefecture: "Fukui",
    region: "hokuriku",
    lat: 35.97,
    lng: 136.13,
    episode: "Fukui — The Strength to Succeed",
    year: 2022,
    summary:
      "Dawn fishing, Echizen washi and knives, then a high-school cycling team practicing inner strength.",
    highlights: ["Echizen blades", "Washi paper", "High-school peloton"],
  },
  {
    id: "gunma",
    name: "Tomioka",
    prefecture: "Gunma",
    region: "kanto",
    lat: 36.26,
    lng: 138.89,
    kmHint: 260,
    episode: "Autumn: World Heritage Sites — Tomioka to Nikko",
    year: 2014,
    summary:
      "Silk mill modernity beside hand-reeled tradition, then the climb toward Nikko's forest shrines.",
    highlights: ["Tomioka Silk Mill", "Hand silk making", "Tone River"],
  },
  {
    id: "nikko",
    name: "Nikko & Nasu",
    prefecture: "Tochigi",
    region: "kanto",
    lat: 36.75,
    lng: 139.61,
    episode: "Ibaraki & Tochigi — The Bounties of Spring",
    year: 2026,
    summary:
      "Carp banners over Nasu, Mashiko clay, a restored classic motorcycle, and Toshogu glowing in cedar.",
    highlights: ["Nikko Toshogu", "Nasu highlands", "Mashiko pottery"],
    vodId: "2066089",
  },
  {
    id: "ibaraki",
    name: "Tsukuba & Kamisu",
    prefecture: "Ibaraki",
    region: "kanto",
    lat: 36.08,
    lng: 140.11,
    kmHint: 400,
    episode: "Ibaraki — Passion for Tradition",
    year: 2025,
    summary:
      "Bell-pepper fields, organic towns, icefish, lotus-root winter harvests, and brothers forging armor.",
    highlights: ["Kamisu piman", "Organic farming", "Icefish catching"],
    vodId: "2066089",
  },
  {
    id: "saitama",
    name: "Kawagoe",
    prefecture: "Saitama",
    region: "kanto",
    lat: 35.93,
    lng: 139.49,
    episode: "Saitama Traditions — Tokyo's Scenic Neighbor",
    year: 2022,
    summary:
      "Ginkgo gold, dollmakers, old-style candy, and a climate that hides world-class whisky.",
    highlights: ["Kawagoe warehouse town", "Family dollmakers", "Whisky climate"],
  },
  {
    id: "tokyo",
    name: "Tokyo backcountry",
    prefecture: "Tokyo",
    region: "kanto",
    lat: 35.68,
    lng: 139.69,
    episode: "A Deeper Side to Tokyo",
    year: 2020,
    summary:
      "Shinjuku alleys to west-Tokyo rivers: a 200-year dye craft and a woodsman thinking in centuries.",
    highlights: ["Hidden farms", "Edo dyeing", "Urban-to-forest ride"],
  },
  {
    id: "boso",
    name: "Boso Peninsula",
    prefecture: "Chiba",
    region: "kanto",
    lat: 35.25,
    lng: 140.15,
    episode: "Spring: A Journey through Boso Peninsula",
    year: 2016,
    summary:
      "Narita to the Pacific: Tokyo's breadbasket, fishing villages, and winter art from embroidery to sushi rolls.",
    highlights: ["Narita start", "Pacific surf towns", "Castle-town Sakura"],
  },
  {
    id: "izu",
    name: "Izu Peninsula",
    prefecture: "Shizuoka",
    region: "alps",
    lat: 34.97,
    lng: 138.95,
    episode: "Spring: Through Izu to Mt. Fuji",
    year: 2014,
    summary:
      "The series' first ride: green spring mountains, onsen ports, a steep beginners' pass, and Heda's deep-sea fish.",
    highlights: ["Onsen coast", "Steep Izu pass", "Heda deep-sea fish"],
    vodId: "2066086",
  },
  {
    id: "niijima",
    name: "Niijima & Hachijo",
    prefecture: "Tokyo islands",
    region: "kanto",
    lat: 34.37,
    lng: 139.26,
    episode: "Tokyo's Islands Niijima and Hachijojima",
    year: 2023,
    summary:
      "A Pacific spur from the Izu line: volcanic koga-stone glass, exile graves, plant-dyed kihachijo, aloe in winter bloom.",
    highlights: ["Koga stone glass", "Kihachijo dyeing", "Turquoise Niijima"],
  },
  {
    id: "fuji",
    name: "Mt. Fuji highlands",
    prefecture: "Shizuoka / Yamanashi",
    region: "alps",
    lat: 35.36,
    lng: 138.73,
    kmHint: 230,
    episode: "Fuji and the Highlands — A Winter Ride",
    year: 2019,
    summary:
      "Fat-bike snow, lake circuits, and a winter line around Japan's highest peak.",
    highlights: ["Fuji Five Lakes", "Winter fat bike", "Highland conservation"],
  },
  {
    id: "shizuoka",
    name: "Wasabi forests",
    prefecture: "Shizuoka",
    region: "alps",
    lat: 35.05,
    lng: 138.15,
    episode: "Shizuoka — Energy of the Forest",
    year: 2024,
    summary:
      "Off the Tokaido and into timber trails: the birthplace of wasabi, mountain perches, and tea hills.",
    highlights: ["Birthplace of wasabi", "Timber trails", "Tea country"],
    vodId: "2066072",
  },
  {
    id: "yatsugatake",
    name: "Yatsugatake",
    prefecture: "Nagano / Yamanashi",
    region: "alps",
    lat: 35.97,
    lng: 138.37,
    episode: "Yatsugatake — Riding High",
    year: 2024,
    summary:
      "Horseback kids, prehistoric cooking, star forests, and Fuji glimpsed from highland roads.",
    highlights: ["Highland horseback", "Star-gazing forest", "Fuji on the horizon"],
    vodId: "2066070",
  },
  {
    id: "narai",
    name: "Narai-juku",
    prefecture: "Nagano",
    region: "alps",
    lat: 35.97,
    lng: 137.81,
    kmHint: 300,
    episode: "Southern Nagano — Exploring Its Hidden Valleys",
    year: 2023,
    summary:
      "The 400-year Nakasendo: comb artisans, green tofu, straw for sumo rings, and tea on steep south slopes.",
    highlights: ["Nakasendo post town", "Ina Basin straw craft", "Hot-spring salt"],
  },
  {
    id: "northern-alps",
    name: "Northern Alps",
    prefecture: "Nagano / Toyama / Gifu",
    region: "alps",
    lat: 36.3,
    lng: 137.65,
    episode: "Japan's Northern Alps — Life-Giving Mountains",
    year: 2025,
    summary:
      "Early spring at the foot of 3,000 m peaks: snowshoes, salmon-trout sushi, medicinal herbs.",
    highlights: ["Traditional snowshoes", "Mountain sushi", "Herb gathering"],
  },
  {
    id: "gifu",
    name: "Kiso Three Rivers",
    prefecture: "Gifu",
    region: "alps",
    lat: 35.42,
    lng: 136.76,
    kmHint: 360,
    episode: "Kiso Three Rivers — Going with the Flow",
    year: 2024,
    summary:
      "Kiso, Nagara, Ibi: cormorant fishing, float festivals, swordsmiths, and hillside towns built on water.",
    highlights: ["Cormorant fishing", "Village kabuki", "Katana forge"],
  },
  {
    id: "biwa",
    name: "Lake Biwa",
    prefecture: "Shiga",
    region: "kansai",
    lat: 35.25,
    lng: 136.12,
    episode: "Shiga — From Lake to Mountains",
    year: 2025,
    summary:
      "Japan's largest lake: Shigaraki ware, Wana velvet, an island by tricycle, then the climb inland.",
    highlights: ["Shigaraki pottery", "Lake island tricycle", "Setsubun winter ride"],
  },
  {
    id: "kyoto",
    name: "Kyoto countryside",
    prefecture: "Kyoto",
    region: "kansai",
    lat: 35.15,
    lng: 135.45,
    kmHint: 400,
    episode: "Into the Kyoto Countryside",
    year: 2022,
    summary:
      "Not the city — bamboo forests, an 800-year teahouse, whetstone mines, and a mother-daughter fish van on the Sea of Japan.",
    highlights: ["800-year teahouse", "Whetstone forest", "Bamboo groves"],
  },
  {
    id: "osaka",
    name: "Sakai to Kashiwara",
    prefecture: "Osaka",
    region: "kansai",
    lat: 34.57,
    lng: 135.48,
    kmHint: 250,
    episode: "Osaka — Boundless Passion for Life",
    year: 2025,
    summary:
      "Knife city Sakai, a homemade mountain-bike course, summer hamo, juicy mizu-nasu, and a night ride through canals.",
    highlights: ["Sakai knives", "Mizu-nasu eggplant", "Night canal ride"],
    vodId: "2066080",
  },
  {
    id: "nara",
    name: "Nara basins",
    prefecture: "Nara",
    region: "kansai",
    lat: 34.69,
    lng: 135.83,
    episode: "Nara — Discovering Ancient Ways",
    year: 2020,
    summary:
      "Japan's steepest road out of Osaka, sacred forest, kofun country, and a village restaurant that is the whole town's joy.",
    highlights: ["Sacred Nara forest", "Ancient burial mounds", "Mountain onsen towns"],
  },
  {
    id: "kii",
    name: "Kii Mountains",
    prefecture: "Wakayama / Nara",
    region: "kansai",
    lat: 33.95,
    lng: 135.55,
    kmHint: 350,
    episode: "Kii Mountains — Climbing Uphill with a Smile",
    year: 2024,
    summary:
      "350 km of citrus slopes, rare black bamboo, pine-soot sumi, and Kumano's sacred ridges.",
    highlights: ["60 kinds of citrus", "Black bamboo", "Sumi pigment"],
  },
  {
    id: "ise",
    name: "Ise & Ama coast",
    prefecture: "Mie",
    region: "kansai",
    lat: 34.49,
    lng: 136.7,
    kmHint: 300,
    episode: "Mie — A Cultural Crossroads",
    year: 2022,
    summary:
      "Old Tokaido post towns, ninja-descendant sweets, pearl farms, and ama divers who still work without tanks.",
    highlights: ["Ise shrine approaches", "Pearl cultivation", "Ama divers"],
  },
  {
    id: "awaji",
    name: "Awaji & Ieshima",
    prefecture: "Hyogo",
    region: "seto",
    lat: 34.35,
    lng: 134.9,
    episode: "Awajishima and Ieshima — An Island Journey",
    year: 2024,
    summary:
      "Winter wind as a tool: onions sweet enough to eat raw, incense, handmade noodles, and seaweed.",
    highlights: ["Sweet raw onions", "Incense sticks", "Seto island hops"],
  },
  {
    id: "tottori",
    name: "Tottori dunes",
    prefecture: "Tottori",
    region: "seto",
    lat: 35.54,
    lng: 134.23,
    kmHint: 300,
    episode: "Tottori — Grit and Grace",
    year: 2020,
    summary:
      "Fat-bike sand for 16 km, high-school calligraphy as performance, and vegetables grown in dunes.",
    highlights: ["16 km dune ride", "Sand farming", "Calligraphy club"],
  },
  {
    id: "izumo",
    name: "Izumo Highway",
    prefecture: "Shimane / Hyogo",
    region: "seto",
    lat: 35.4,
    lng: 132.75,
    episode: "Izumo Highway — A Road That Builds Bonds",
    year: 2025,
    summary:
      "An ancient road of connection: magatama agate, a wrestler learning to farm, wind chimes from armor steel, Himeji keep.",
    highlights: ["Magatama artisans", "Shinjo post town", "Izumo Taisha country"],
    vodId: "2066079",
  },
  {
    id: "okayama",
    name: "Kasaoka & Kitagishima",
    prefecture: "Okayama",
    region: "seto",
    lat: 34.5,
    lng: 133.5,
    episode: "Okayama — Charming Rustic Warmth",
    year: 2026,
    summary:
      "Horseshoe-crab shores, a 40 m quarry cliff, a temple of 300 woodblock prints, and Inland Sea sunsets.",
    highlights: ["Horseshoe crabs", "Kitagishima quarry", "Priest's woodblock temple"],
    vodId: "2066087",
  },
  {
    id: "shimanami",
    name: "Shimanami Kaido",
    prefecture: "Hiroshima / Ehime",
    region: "seto",
    lat: 34.25,
    lng: 133.05,
    kmHint: 70,
    episode: "Shimanami — Life on the Islands",
    year: 2018,
    summary:
      "The world's favorite island-hop: 70 km of bridges, mikan groves, drying fish, and a potter glazing with oyster shells.",
    highlights: ["Bridge-to-bridge ride", "Mikan islands", "Oyster-shell glaze"],
  },
  {
    id: "yamaguchi",
    name: "Suo-Oshima & Hagi",
    prefecture: "Yamaguchi",
    region: "seto",
    lat: 33.92,
    lng: 132.2,
    kmHint: 270,
    episode: "Yamaguchi — Where Kindness is King",
    year: 2025,
    summary:
      "Inland Sea islands poor in amenities, rich in welcome — stone alleys, pear orchards, and Hagi's castle-town calm.",
    highlights: ["Iwaishima alleys", "Katazoegahama beach", "Heigun school"],
    vodId: "2066076",
  },
  {
    id: "kagawa",
    name: "Kagawa crafts",
    prefecture: "Kagawa",
    region: "seto",
    lat: 34.34,
    lng: 134.05,
    episode: "Kagawa — The Pursuit of Excellence",
    year: 2020,
    summary:
      "Dry-land ingenuity: paper fans without local bamboo, world bonsai, wasanbon sweets, island soy sauce.",
    highlights: ["Uchiwa fans", "Bonsai", "Wasanbon"],
  },
  {
    id: "naruto",
    name: "Naruto Straits",
    prefecture: "Tokushima",
    region: "seto",
    lat: 34.24,
    lng: 134.64,
    episode: "Tokushima — Where Teamwork Runs Deep",
    year: 2022,
    summary:
      "Whirlpool cherry sea bream, Kamikatsu's elderly leaf farmers, and a hidden-valley welcome.",
    highlights: ["Naruto whirlpools", "Kamikatsu leaves", "Mountain valleys"],
  },
  {
    id: "ehime",
    name: "Matsuyama to Karst",
    prefecture: "Ehime",
    region: "seto",
    lat: 33.84,
    lng: 132.77,
    episode: "From Sea to Mountains, Spring in Ehime",
    year: 2017,
    summary:
      "Dogo Onsen, terraced danbata, Uwajima bullfights, then 1,400 m Shikoku Karst.",
    highlights: ["Dogo Onsen", "Danbata terraces", "Shikoku Karst"],
  },
  {
    id: "kochi",
    name: "Shimanto & Niyodo",
    prefecture: "Kochi",
    region: "seto",
    lat: 33.32,
    lng: 133.05,
    kmHint: 370,
    episode: "Kochi — Land of Rivers",
    year: 2023,
    summary:
      "Sweetfish for Kyoto kitchens, hillside springwater farms, and charcoal makers planting tomorrow's oak.",
    highlights: ["Niyodo ayu", "Shimanto pilgrimage", "Oak charcoal"],
  },
  {
    id: "fukuoka",
    name: "Fukuoka canals",
    prefecture: "Fukuoka",
    region: "kyushu",
    lat: 33.59,
    lng: 130.4,
    episode: "Fukuoka — Always Thinking Ahead",
    year: 2023,
    summary:
      "Japan's old Asian gateway: organic revival, a singing boatman, fireworks, and the last coal songs.",
    highlights: ["Canal boatman", "Stone-bridge villagers", "Coal-mine memory"],
  },
  {
    id: "oita",
    name: "Beppu & Yamanami",
    prefecture: "Oita",
    region: "kyushu",
    lat: 33.28,
    lng: 131.49,
    kmHint: 350,
    episode: "Oita — Warming Body and Soul",
    year: 2026,
    summary:
      "Onsen capital: duck races, an artist in Saganoseki, a café stitching generations, and the beloved Yamanami Highway.",
    highlights: ["Beppu duck race", "Yamanami Highway", "Saganoseki art"],
    vodId: "2066088",
  },
  {
    id: "nagasaki",
    name: "Nagasaki Kaido",
    prefecture: "Nagasaki",
    region: "kyushu",
    lat: 32.75,
    lng: 129.88,
    kmHint: 290,
    episode: "The Nagasaki Kaido — Japan's Sugar Road",
    year: 2023,
    summary:
      "The Edo-era exception port: sugar, science, and 1,400 islands still shaping a free-spirited ride.",
    highlights: ["Sugar Road", "Sasebo spinning tops", "Island-scattered sea"],
  },
  {
    id: "goto",
    name: "Goto Islands",
    prefecture: "Nagasaki",
    region: "kyushu",
    lat: 32.7,
    lng: 128.75,
    episode: "Goto Islands — Chain of Hospitality",
    year: 2026,
    summary:
      "Camellia gin, a World Heritage church kept by a Catholic couple, and 16 people still staging an autumn festival on Noh.",
    highlights: ["Hidden Christians", "Camellia gin", "Mt. Onidake views"],
    vodId: "2066085",
  },
  {
    id: "kumamoto",
    name: "Aso & Amakusa",
    prefecture: "Kumamoto",
    region: "kyushu",
    lat: 32.88,
    lng: 131.1,
    kmHint: 300,
    episode: "Kumamoto — Blessings of Ancestry and Nature",
    year: 2025,
    summary:
      "Inlay artisans, brown cattle, embankment memory, and the world's great volcanic caldera.",
    highlights: ["Mt. Aso caldera", "Traditional inlay", "Amakusa chain"],
  },
  {
    id: "miyazaki",
    name: "Takachiho",
    prefecture: "Miyazaki",
    region: "kyushu",
    lat: 32.71,
    lng: 131.31,
    episode: "Miyazaki — Through a Sunlit Land",
    year: 2018,
    summary:
      "Year-round warmth, mythic Takachiho gorge, and a Pacific coast that feels like summer even in spring.",
    highlights: ["Takachiho mythology", "Sunlit coast", "Lush forest"],
  },
  {
    id: "kagoshima",
    name: "Satsuma",
    prefecture: "Kagoshima",
    region: "kyushu",
    lat: 31.6,
    lng: 130.56,
    kmHint: 290,
    episode: "Kagoshima — Legacy of Determination",
    year: 2019,
    summary:
      "Active volcano views, jars of black vinegar, revived antique buttons, and a secret samurai martial art.",
    highlights: ["Sakurajima views", "Black vinegar", "Satsuma spirit"],
  },
  {
    id: "yakushima",
    name: "Yakushima & Tanegashima",
    prefecture: "Kagoshima",
    region: "nansei",
    lat: 30.34,
    lng: 130.52,
    episode: "Tanegashima and Yakushima — Inspired by Nature",
    year: 2020,
    summary:
      "500-year scissors, rocket-range schools, then millennia-old cedars that still set the island's clock.",
    highlights: ["Yakusugi forests", "Tanegashima space center", "Island scissors"],
  },
  {
    id: "amami",
    name: "Amami-Oshima",
    prefecture: "Kagoshima",
    region: "nansei",
    lat: 28.38,
    lng: 129.49,
    kmHint: 330,
    episode: "Winter: The Southern Island of Amami-Oshima",
    year: 2016,
    summary:
      "A 330 km subtropical loop: island song, Oshima tsumugi silk, coral water in midwinter.",
    highlights: ["Oshima tsumugi", "Island songs", "Coral winter"],
  },
  {
    id: "okinawa",
    name: "Okinawa Honto",
    prefecture: "Okinawa",
    region: "nansei",
    lat: 26.33,
    lng: 127.8,
    episode: "Okinawa — A Unique Island Culture",
    year: 2023,
    summary:
      "Former trading kingdom: bingata color, longevity tables, and folk songs that remember a hard century.",
    highlights: ["Island longevity food", "Bingata textiles", "Folk song memory"],
  },
  {
    id: "miyako",
    name: "Miyako Islands",
    prefecture: "Okinawa",
    region: "nansei",
    lat: 24.8,
    lng: 125.28,
    episode: "Miyako Islands — Riding the Ocean Breeze",
    year: 2019,
    summary:
      "Bridge-hopping eight islands, seawater tofu, sanshin ebony, and a mangrove walk at low tide.",
    highlights: ["Shima-dofu", "Sanshin music", "Mangrove low tide"],
  },
  {
    id: "yaeyama",
    name: "Yaeyama",
    prefecture: "Okinawa",
    region: "nansei",
    lat: 24.34,
    lng: 124.16,
    episode: "Okinawa: The Tropical Yaeyama Islands",
    year: 2016,
    summary:
      "The last pedal: Ishigaki sabani boats, Taketomi's white sand, minsa weaving, Hateruma's one-school island.",
    highlights: ["Sabani boats", "Taketomi streets", "Hateruma school"],
  },
];

export const stats = {
  years: "2014–2026",
  episodeCount: 100,
  typicalKm: "250–400",
  typicalDays: "3–4",
  islands: "Hokkaido to Yonaguni",
};

export function stopsByRegion(id: RegionId): Stop[] {
  return stops.filter((s) => s.region === id);
}

export function regionOf(id: RegionId): Region {
  const region = regions.find((r) => r.id === id);
  if (!region) throw new Error(`Unknown region ${id}`);
  return region;
}

export const japanBounds = {
  minLat: 24.0,
  maxLat: 45.6,
  minLng: 122.9,
  maxLng: 145.9,
};
