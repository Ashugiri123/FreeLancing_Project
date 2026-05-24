const productImage = (title, category, color, accent) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${color}" />
          <stop offset="1" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#bg)" />
      <circle cx="510" cy="88" r="112" fill="rgba(255,255,255,.18)" />
      <circle cx="88" cy="390" r="138" fill="rgba(255,255,255,.14)" />
      <rect x="126" y="112" width="388" height="248" rx="34" fill="rgba(255,255,255,.9)" />
      <rect x="166" y="166" width="308" height="26" rx="13" fill="${accent}" opacity=".75" />
      <rect x="166" y="218" width="238" height="22" rx="11" fill="${color}" opacity=".78" />
      <rect x="166" y="270" width="282" height="22" rx="11" fill="#171717" opacity=".16" />
      <text x="320" y="390" text-anchor="middle" fill="#171717" font-family="Arial, sans-serif" font-size="34" font-weight="800">${title}</text>
      <text x="320" y="426" text-anchor="middle" fill="#4c4c45" font-family="Arial, sans-serif" font-size="22" font-weight="700">${category}</text>
    </svg>
  `)}`;

export const productCategories = [
  {
    name: "Art",
    slug: "art",
    icon: "\u{1F3A8}",
    title: "Art from campus creators",
    description: "Original prints, illustrated goods, and collectible pieces made by student artists.",
    heroNote: "Turn blank walls, notebooks, and gift lists into small galleries.",
    sellerPrompt: "Sell your prints, commissions, posters, and handmade art drops."
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: "\u{1F455}",
    title: "Fashion finds for everyday campus life",
    description: "Totes, thrifted staples, statement pieces, and student-designed accessories.",
    heroNote: "Fresh pieces with practical prices and seller stories attached.",
    sellerPrompt: "List clothing, accessories, thrift edits, and limited campus merch."
  },
  {
    name: "Electronics",
    slug: "electronics",
    icon: "\u{1F3A7}",
    title: "Electronics for study, play, and projects",
    description: "Useful gadgets, audio gear, chargers, and everyday electronics from student sellers.",
    heroNote: "Find gear that fits dorm desks, group work, and late-night study sessions.",
    sellerPrompt: "Post tested gadgets, spare accessories, and electronics in good condition."
  },
  {
    name: "Handmade",
    slug: "handmade",
    icon: "\u{1F9F5}",
    title: "Handmade goods with a personal touch",
    description: "Crafted items, desk goods, textile work, and small-batch student-made products.",
    heroNote: "Support slow-made products that feel different from mass-market finds.",
    sellerPrompt: "Showcase crochet, craft, stationery, decor, and made-to-order goods."
  },
  {
    name: "Tech",
    slug: "tech",
    icon: "\u{1F4BB}",
    title: "Tech essentials for smarter student workflows",
    description: "Desk upgrades, laptop gear, cables, hubs, and practical tools for productive days.",
    heroNote: "Upgrade your setup without wandering through endless generic listings.",
    sellerPrompt: "Offer laptop accessories, coding tools, desk kits, and useful tech extras."
  },
  {
    name: "Books",
    slug: "books",
    icon: "\u{1F4DA}",
    title: "Books, notes, and study material",
    description: "Pre-loved textbooks, design books, novels, reference guides, and exam resources.",
    heroNote: "Keep useful books moving from one student shelf to another.",
    sellerPrompt: "Sell textbooks, novels, prep guides, notes, and resource bundles."
  },
  {
    name: "Home Decor",
    slug: "home-decor",
    icon: "\u{1FAB4}",
    title: "Home decor for dorms and cozy corners",
    description: "Plants, lights, organizers, wall pieces, and decor that makes student spaces warmer.",
    heroNote: "Small upgrades that make a room feel like yours.",
    sellerPrompt: "List plants, ceramics, lamps, organizers, posters, and room accents."
  }
];

export const products = [
  {
    _id: "static-1",
    title: "Canvas Mini Prints",
    price: 449,
    sellerName: "Aarav Studio",
    category: "Art",
    categorySlug: "art",
    badge: "Trending",
    image: productImage("Mini Prints", "Art", "#f1b84b", "#126b58")
  },
  {
    _id: "static-2",
    title: "Campus Denim Tote",
    price: 699,
    sellerName: "Thread Lane",
    category: "Fashion",
    categorySlug: "fashion",
    badge: "Featured",
    image: productImage("Denim Tote", "Fashion", "#93b7be", "#d97941")
  },
  {
    _id: "static-3",
    title: "Wireless Study Earbuds",
    price: 1299,
    sellerName: "Byte Cart",
    category: "Electronics",
    categorySlug: "electronics",
    badge: "Hot",
    image: productImage("Earbuds", "Electronics", "#8fa8ff", "#202b52")
  },
  {
    _id: "static-4",
    title: "Handwoven Desk Mat",
    price: 549,
    sellerName: "Made by Mira",
    category: "Handmade",
    categorySlug: "handmade",
    badge: "New",
    image: productImage("Desk Mat", "Handmade", "#f0c7a1", "#8b5d33")
  },
  {
    _id: "static-5",
    title: "USB-C Hub Pro",
    price: 1599,
    sellerName: "TechNest",
    category: "Tech",
    categorySlug: "tech",
    badge: "Trending",
    image: productImage("USB-C Hub", "Tech", "#8fd6c7", "#18463f")
  },
  {
    _id: "static-6",
    title: "Second-Hand Design Books",
    price: 899,
    sellerName: "Page Market",
    category: "Books",
    categorySlug: "books",
    badge: "Featured",
    image: productImage("Design Books", "Books", "#f4d35e", "#5f6f52")
  },
  {
    _id: "static-7",
    title: "Ceramic Plant Pot",
    price: 399,
    sellerName: "Dorm Bloom",
    category: "Home Decor",
    categorySlug: "home-decor",
    badge: "New",
    image: productImage("Plant Pot", "Home Decor", "#a8d5ba", "#536f55")
  },
  {
    _id: "static-8",
    title: "Laptop Stand Lite",
    price: 1199,
    sellerName: "DeskLab",
    category: "Tech",
    categorySlug: "tech",
    badge: "Hot",
    image: productImage("Laptop Stand", "Tech", "#c0b7ff", "#514f8f")
  },
  {
    _id: "static-9",
    title: "Watercolor Bookmark Set",
    price: 199,
    sellerName: "Ink Bench",
    category: "Art",
    categorySlug: "art",
    badge: "New",
    image: productImage("Bookmarks", "Art", "#f6d186", "#6a8caf")
  },
  {
    _id: "static-10",
    title: "Thrifted Overshirt",
    price: 849,
    sellerName: "Closet Circle",
    category: "Fashion",
    categorySlug: "fashion",
    badge: "Trending",
    image: productImage("Overshirt", "Fashion", "#c9d6df", "#52616b")
  },
  {
    _id: "static-11",
    title: "Braided Charging Cable",
    price: 299,
    sellerName: "Volt Lane",
    category: "Electronics",
    categorySlug: "electronics",
    badge: "Featured",
    image: productImage("Cable", "Electronics", "#bdd5ea", "#495867")
  },
  {
    _id: "static-12",
    title: "Crochet Keychain Pair",
    price: 249,
    sellerName: "Loop Lab",
    category: "Handmade",
    categorySlug: "handmade",
    badge: "Trending",
    image: productImage("Keychains", "Handmade", "#ffd6a5", "#9d4edd")
  },
  {
    _id: "static-13",
    title: "Algorithm Notes Bundle",
    price: 349,
    sellerName: "Code Shelf",
    category: "Books",
    categorySlug: "books",
    badge: "Hot",
    image: productImage("Algo Notes", "Books", "#b8f2e6", "#2364aa")
  },
  {
    _id: "static-14",
    title: "Warm Desk Lamp",
    price: 799,
    sellerName: "Room Reset",
    category: "Home Decor",
    categorySlug: "home-decor",
    badge: "Featured",
    image: productImage("Desk Lamp", "Home Decor", "#ffe5d9", "#7f5539")
  }
];

export const featuredBadges = new Set(["Trending", "Featured", "Hot"]);

export function getCategoryBySlug(slug) {
  return productCategories.find((category) => category.slug === slug);
}

export function searchProducts(items, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return items;

  return items.filter((product) =>
    [product.title, product.sellerName, product.category, product.badge].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )
  );
}
