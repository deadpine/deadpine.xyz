export const HERO_VARIANTS = [
  {
    id: "editorial",
    number: "01",
    name: "Editorial",
    blurb: "Tagline as the architecture",
  },
  {
    id: "wordmark",
    number: "02",
    name: "Wordmark",
    blurb: "Name at display scale",
  },
  {
    id: "split",
    number: "03",
    name: "Split",
    blurb: "Two-column manifesto",
  },
  {
    id: "catalog",
    number: "04",
    name: "Catalog",
    blurb: "Print title page",
  },
  {
    id: "mosaic",
    number: "05",
    name: "Mosaic",
    blurb: "Work as the hero",
  },
  {
    id: "magenta",
    number: "06",
    name: "Magenta",
    blurb: "Accent as the field",
  },
  {
    id: "marquee",
    number: "07",
    name: "Marquee",
    blurb: "A river of selected work",
  },
  {
    id: "poster",
    number: "08",
    name: "Poster",
    blurb: "Stacked type, Swiss poster",
  },
  {
    id: "folio",
    number: "09",
    name: "Folio",
    blurb: "Catalog page, about as colophon",
  },
  {
    id: "studio",
    number: "10",
    name: "Studio",
    blurb: "About beside selected work",
  },
  {
    id: "cameo",
    number: "11",
    name: "Cameo",
    blurb: "A project through the pinecone",
  },
] as const;

export type HeroVariantId = (typeof HERO_VARIANTS)[number]["id"];
