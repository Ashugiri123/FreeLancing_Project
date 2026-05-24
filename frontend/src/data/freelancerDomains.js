export const freelancerDomains = [
  {
    slug: "web-development",
    name: "Web Development",
    initials: "WE",
    summary: "Build modern websites, landing pages, dashboards, and storefront experiences for campus sellers and small teams.",
    impact: "Great for students who enjoy logic, visual polish, and turning ideas into usable products.",
    requiredSkills: ["HTML, CSS, JavaScript", "Responsive layouts", "React basics", "APIs and forms"],
    tools: ["VS Code", "GitHub", "Chrome DevTools", "Figma"],
    roadmap: ["Build a personal page", "Recreate 2 landing pages", "Create a small React app", "Deploy a portfolio site"],
    projects: ["College club website", "Product listing page", "Restaurant landing page", "Dashboard UI clone"],
    opportunities: ["Landing pages for sellers", "Portfolio sites for students", "Event registration pages", "Small business catalog pages"],
    pricing: ["Beginner: Rs 500-1,500 per page", "Intermediate: Rs 3,000-8,000 per site", "Charge extra for forms, hosting setup, or urgent delivery"],
    growth: ["Turn class projects into portfolio proof", "Get feedback from real campus users", "Package websites as repeatable services"],
    resources: ["MDN Web Docs", "freeCodeCamp", "React.dev", "Frontend Mentor"]
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    initials: "GR",
    summary: "Create posters, brand kits, thumbnails, social posts, and launch graphics for student creators.",
    impact: "Strong fit for students who like visual storytelling, color, typography, and brand communication.",
    requiredSkills: ["Typography", "Color theory", "Layout systems", "Brand consistency"],
    tools: ["Canva", "Figma", "Adobe Photoshop", "Adobe Illustrator"],
    roadmap: ["Study 5 strong posters", "Design social posts", "Make logo variations", "Create a mini brand kit"],
    projects: ["Instagram carousel", "Event poster", "Business card set", "Brand moodboard"],
    opportunities: ["Club event posters", "Seller product graphics", "Logo refreshes", "Social media post packs"],
    pricing: ["Beginner: Rs 150-400 per post", "Poster packs: Rs 500-1,200", "Brand kits: Rs 1,500-4,000"],
    growth: ["Build a visual portfolio from campus briefs", "Learn client revisions safely", "Sell design packs to student sellers"],
    resources: ["Canva Design School", "Figma Learn", "The Futur", "Adobe tutorials"]
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    initials: "VI",
    summary: "Edit reels, event recaps, product clips, learning videos, and short-form content for creators.",
    impact: "Ideal for students who enjoy pacing, storytelling, audio, captions, and content trends.",
    requiredSkills: ["Story pacing", "Cuts and transitions", "Audio cleanup", "Caption design"],
    tools: ["CapCut", "Premiere Pro", "DaVinci Resolve", "Canva"],
    roadmap: ["Edit short reels", "Practice captions", "Create before/after edits", "Build a 30-second promo"],
    projects: ["Product reel", "Event recap", "YouTube intro", "Educational short"],
    opportunities: ["Reels for student sellers", "Event recap edits", "Course explainers", "Product launch videos"],
    pricing: ["Beginner: Rs 300-800 per short video", "Monthly reel packs: Rs 2,000-5,000", "Add-ons: subtitles, thumbnails, rush delivery"],
    growth: ["Convert campus events into portfolio clips", "Learn recurring content workflows", "Offer monthly editing bundles"],
    resources: ["CapCut tutorials", "DaVinci Resolve training", "Premiere Pro Learn", "YouTube Creator Academy"]
  },
  {
    slug: "ui-ux",
    name: "UI/UX",
    initials: "UI",
    summary: "Design app screens, user flows, wireframes, prototypes, and usability improvements for digital products.",
    impact: "Best for students who like understanding users, organizing information, and crafting polished interfaces.",
    requiredSkills: ["User flows", "Wireframing", "Visual hierarchy", "Usability testing"],
    tools: ["Figma", "FigJam", "Notion", "Maze"],
    roadmap: ["Redesign one app screen", "Map a checkout flow", "Prototype a dashboard", "Test with 3 friends"],
    projects: ["App onboarding", "Checkout redesign", "Student dashboard", "Case study with decisions"],
    opportunities: ["App screen redesigns", "Clickable prototypes", "Landing page wireframes", "Usability audit reports"],
    pricing: ["Beginner: Rs 700-1,500 per screen", "Prototype flows: Rs 2,500-6,000", "Offer audit + redesign bundles"],
    growth: ["Turn redesigns into case studies", "Practice with real student marketplace flows", "Use UNIVENDA briefs to learn client thinking"],
    resources: ["Figma Learn", "Nielsen Norman Group", "Laws of UX", "UX Collective"]
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    initials: "CO",
    summary: "Write product descriptions, blogs, emails, social captions, and clear stories for student businesses.",
    impact: "Great for students who enjoy research, language, structure, and helping ideas sound sharper.",
    requiredSkills: ["Clear structure", "Research", "SEO basics", "Editing and tone"],
    tools: ["Google Docs", "Grammarly", "Notion", "Google Trends"],
    roadmap: ["Write daily summaries", "Create 3 blog drafts", "Rewrite product descriptions", "Pitch short articles"],
    projects: ["Blog post set", "Product descriptions", "LinkedIn posts", "Email newsletter sample"],
    opportunities: ["Product descriptions", "Blog writing", "LinkedIn content", "Email announcements"],
    pricing: ["Beginner: Rs 250-700 per short article", "Product copy packs: Rs 500-1,500", "Charge more for research-heavy topics"],
    growth: ["Write for real campus sellers", "Build niche samples quickly", "Learn client tone and revision habits"],
    resources: ["Google Search Central", "HubSpot Blog", "Grammarly Handbook", "Copyblogger"]
  }
];

export function getFreelancerDomain(slug) {
  return freelancerDomains.find((domain) => domain.slug === slug);
}
