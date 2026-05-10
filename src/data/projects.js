export const projects = [
  {
    id: "1",
    slug: "fintech-dashboard",
    title: "Fintech SaaS",
    category: "UX/UI Dizainas",
    year: "2026",
    client: "Asmeninis projektas",
    role: "Produkto kūrėjas",
    duration: "3 mėnesiai",
    description: "Inovatyvus SaaS „landing“ puslapis ir intuityvus finansų valdymo skydelis.",
    longDescription: "Tai nuo nulio sukurtas asmeninis projektas, kurio tikslas buvo pademonstruoti modernių „Fintech“ sprendimų viziją. Projektą sudaro dvi pagrindinės dalys: konversijoms optimizuotas įvaizdinis „landing“ puslapis ir išsamus, vartotojui draugiškas valdymo skydelis (dashboard). Viskas sukurta siekiant estetinio patrauklumo ir maksimalaus patogumo.",
    challenge: "Pagrindinis iššūkis kuriant šį projektą buvo rasti tobulą balansą tarp informacijos gausos, būdingos finansinėms platformoms, ir vizualinio švarumo. Norėjosi sukurti modernų, drąsų įvaizdį naudojant tamsųjį režimą („dark mode“) ir sudėtingus duomenis paversti lengvai skaitomais vizualizacijos elementais.",
    solution: "Sprendimas apėmė išsamios dizaino sistemos sukūrimą. „Landing“ puslapyje pritaikytos modernios mikro-animacijos, atkreipiančios dėmesį į pagrindinius produkto privalumus. Valdymo skydelyje naudotas modulinis išdėstymas, leidžiantis vartotojui greitai apžvelgti savo finansinę situaciją be kognityvinės perkrovos.",
    image: "/project1.jpg",
    tags: ["SaaS", "Dashboard", "Fintech", "Asmeninis projektas"],
    featured: true,
  },
  {
    id: "2",
    slug: "narsa",
    title: "Narsa",
    category: "Mobilioji programėlė",
    year: "2025",
    client: "Asmeninis projektas",
    role: "Produkto kūrėjas",
    duration: "4 mėnesiai",
    description: "Inovatyvi gerovės programėlė, skirta psichikos sveikatai ir asmeninių istorijų pasakojimui.",
    longDescription: "„Narsa“ yra asmeninės iniciatyvos projektas – gerovės (wellness) programėlė, kuri padeda žmonėms rūpintis savo mentaline sveikata ir skatina juos dalintis savo asmeninėmis istorijomis. Tai saugi, empatiška skaitmeninė erdvė, kurioje vartotojai gali ne tik stebėti savo emocinę būseną, bet ir rasti bendruomenės palaikymą pasakodami ir skaitydami kitų patirtis.",
    challenge: "Dažnai psichikos sveikatos programėlės būna pernelyg klinikinės arba užverčia vartotoją sausais duomenimis. Pagrindinė užduotis buvo sukurti šiltą, kviečiančią sąsają, kuri skatintų atvirumą ir padėtų žmonėms drąsiai atsiskleisti, paverčiant savo emocijų stebėjimą bei istorijų rašymą maloniu, terapiniu įpročiu.",
    solution: "Sukurtas visiškai naujas požiūris į sveikatingumo aplikaciją: naudotos švelnios formos, raminančios spalvų paletės ir subtilios animacijos. Integruotas „storytelling“ modulis leidžia vartotojams intuityviai kurti vizualiai patrauklius savo išgyvenimų pasakojimus, o emocijų sekimo funkcija pateikiama kaip žaidybinė ir neįpareigojanti patirtis.",
    image: "/project2.jpg",
    tags: ["Wellness", "Mental Health", "Storytelling", "Asmeninis projektas"],
    featured: true,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getAllCategories() {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
}
