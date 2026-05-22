import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "../../components/layout/AppShell.jsx";

const TRENDING_SKILLS = [
  "Web Development",
  "Graphic Design",
  "Video Editing",
  "UI/UX",
  "Content Writing"
];

const SKILL_GUIDANCE = {
  "Web Development": {
    requiredSkills: ["HTML, CSS, JavaScript", "Responsive layouts", "React basics", "APIs and forms"],
    tools: ["VS Code", "GitHub", "Chrome DevTools", "Figma"],
    path: ["Build a personal page", "Recreate 2 landing pages", "Create a small React app", "Deploy a portfolio site"],
    portfolio: ["College club website", "Product listing page", "Restaurant landing page", "Dashboard UI clone"]
  },
  "Graphic Design": {
    requiredSkills: ["Typography", "Color theory", "Layout systems", "Brand consistency"],
    tools: ["Canva", "Figma", "Adobe Photoshop", "Adobe Illustrator"],
    path: ["Study 5 strong posters", "Design social posts", "Make logo variations", "Create a mini brand kit"],
    portfolio: ["Instagram carousel", "Event poster", "Business card set", "Brand moodboard"]
  },
  "Video Editing": {
    requiredSkills: ["Story pacing", "Cuts and transitions", "Audio cleanup", "Caption design"],
    tools: ["CapCut", "Premiere Pro", "DaVinci Resolve", "Canva"],
    path: ["Edit short reels", "Practice captions", "Create before/after edits", "Build a 30-second promo"],
    portfolio: ["Product reel", "Event recap", "YouTube intro", "Educational short"]
  },
  "UI/UX": {
    requiredSkills: ["User flows", "Wireframing", "Visual hierarchy", "Usability testing"],
    tools: ["Figma", "FigJam", "Notion", "Maze"],
    path: ["Redesign one app screen", "Map a checkout flow", "Prototype a dashboard", "Test with 3 friends"],
    portfolio: ["App onboarding", "Checkout redesign", "Student dashboard", "Case study with decisions"]
  },
  "Content Writing": {
    requiredSkills: ["Clear structure", "Research", "SEO basics", "Editing and tone"],
    tools: ["Google Docs", "Grammarly", "Notion", "Google Trends"],
    path: ["Write daily summaries", "Create 3 blog drafts", "Rewrite product descriptions", "Pitch short articles"],
    portfolio: ["Blog post set", "Product descriptions", "LinkedIn posts", "Email newsletter sample"]
  }
};

const SUGGESTED_FREELANCERS = [
  {
    name: "Aarav Mehta",
    skill: "Web Development",
    rating: "4.9",
    pricing: "Rs 900/project",
    bio: "Builds responsive storefronts and student portfolio sites with clean React interfaces.",
    image: "https://i.pravatar.cc/180?img=11"
  },
  {
    name: "Nisha Rao",
    skill: "Graphic Design",
    rating: "4.8",
    pricing: "Rs 350/design",
    bio: "Creates posters, brand kits, and social media creatives for campus sellers.",
    image: "https://i.pravatar.cc/180?img=47"
  },
  {
    name: "Kabir Sethi",
    skill: "Video Editing",
    rating: "4.7",
    pricing: "Rs 650/video",
    bio: "Edits reels, promo clips, and product demos with fast captions and clean pacing.",
    image: "https://i.pravatar.cc/180?img=15"
  },
  {
    name: "Meera Shah",
    skill: "UI/UX",
    rating: "4.9",
    pricing: "Rs 1,200/project",
    bio: "Designs app flows, clickable prototypes, and modern dashboards for early products.",
    image: "https://i.pravatar.cc/180?img=32"
  },
  {
    name: "Rohan Iyer",
    skill: "Content Writing",
    rating: "4.6",
    pricing: "Rs 450/article",
    bio: "Writes product copy, blog posts, and social content with student-friendly clarity.",
    image: "https://i.pravatar.cc/180?img=53"
  },
  {
    name: "Anika Verma",
    skill: "Web Development",
    rating: "4.8",
    pricing: "Rs 700/page",
    bio: "Turns Figma screens into polished landing pages for shops, clubs, and founders.",
    image: "https://i.pravatar.cc/180?img=5"
  }
];

const HELP_CARDS = [
  {
    title: "How to start freelancing",
    detail: "Pick one service, define a simple price, and offer a small first project you can finish in 2-3 days."
  },
  {
    title: "How to get your first client",
    detail: "Message classmates, clubs, and local sellers with one clear offer and a sample of your work."
  },
  {
    title: "How to build a portfolio",
    detail: "Show 3 focused projects with the problem, your role, tools used, and a visual before-and-after."
  },
  {
    title: "How to sell products on UNIVENDA",
    detail: "Add strong photos, honest pricing, delivery details, and a short description that answers buyer questions."
  }
];

export function FreelancerListingPage() {
  const [skill, setSkill] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchingSuggestions = useMemo(() => {
    const normalizedSkill = skill.trim().toLowerCase();

    if (!normalizedSkill) {
      return TRENDING_SKILLS;
    }

    return TRENDING_SKILLS.filter((suggestion) => suggestion.toLowerCase().includes(normalizedSkill));
  }, [skill]);

  const activeSkill = useMemo(() => {
    const normalizedSkill = skill.trim().toLowerCase();

    if (!normalizedSkill) {
      return "Web Development";
    }

    return TRENDING_SKILLS.find((item) => item.toLowerCase().includes(normalizedSkill)) || null;
  }, [skill]);

  const guidance = activeSkill ? SKILL_GUIDANCE[activeSkill] : null;

  const filteredFreelancers = useMemo(() => {
    const normalizedSkill = skill.trim().toLowerCase();

    if (!normalizedSkill) {
      return SUGGESTED_FREELANCERS;
    }

    return SUGGESTED_FREELANCERS.filter((freelancer) => freelancer.skill.toLowerCase().includes(normalizedSkill));
  }, [skill]);

  function selectSkill(nextSkill) {
    setSkill(nextSkill);
    setIsSuggestionsOpen(false);
  }

  return (
    <AppShell title="Freelancers">
      <div className="freelancers-page">
        <section className="freelancers-hero">
          <div className="freelancers-hero-copy">
            <h2>Find skilled student freelancers and learn what each skill takes.</h2>
            <p>
              Search by skill, explore beginner guidance, and compare suggested freelancers before starting a project.
            </p>
          </div>
          <div className="freelancers-search-card" ref={searchRef}>
            <label className="field">
              <span>Search freelancers by skill</span>
              <input
                type="search"
                value={skill}
                onChange={(event) => {
                  setSkill(event.target.value);
                  setIsSuggestionsOpen(true);
                }}
                onFocus={() => setIsSuggestionsOpen(true)}
                onClick={() => setIsSuggestionsOpen(true)}
                placeholder="Try Web Development"
                autoComplete="off"
              />
            </label>
            {isSuggestionsOpen && matchingSuggestions.length > 0 && (
              <div className="suggestions-dropdown" role="listbox" aria-label="Skill suggestions">
                {matchingSuggestions.map((suggestion) => (
                  <button
                    className="suggestion-item"
                    type="button"
                    role="option"
                    key={suggestion}
                    onClick={() => selectSkill(suggestion)}
                  >
                    <strong>{suggestion}</strong>
                    <span>View freelancers and beginner guidance</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="panel freelancers-trending-panel">
          <div className="compact-section-head">
            <h2>Trending Skills</h2>
            <p>Choose a skill to update guidance and freelancer results.</p>
          </div>
          <div className="trending-skill-grid">
            {TRENDING_SKILLS.map((trendingSkill) => (
              <button
                className={`trending-skill-card ${activeSkill === trendingSkill ? "active" : ""}`}
                type="button"
                key={trendingSkill}
                onClick={() => selectSkill(trendingSkill)}
              >
                <span>{trendingSkill.slice(0, 2).toUpperCase()}</span>
                <strong>{trendingSkill}</strong>
                <small>{SUGGESTED_FREELANCERS.filter((item) => item.skill === trendingSkill).length} freelancers</small>
              </button>
            ))}
          </div>
        </section>

        <div className="freelancers-main-grid">
          <section className="panel skill-guidance-panel">
            <div className="compact-section-head">
              <h2>Skill Guidance</h2>
              <p>{activeSkill ? `Starter roadmap for ${activeSkill}.` : "Search a trending skill to see a focused roadmap."}</p>
            </div>
            {guidance ? (
              <div className="guidance-grid">
                <GuidanceList title="Required skills" items={guidance.requiredSkills} />
                <GuidanceList title="Recommended tools" items={guidance.tools} />
                <GuidanceList title="Beginner learning path" items={guidance.path} />
                <GuidanceList title="Portfolio suggestions" items={guidance.portfolio} />
              </div>
            ) : (
              <p className="empty-state">No temporary guidance is available for that skill yet.</p>
            )}
          </section>

          <section className="panel beginner-help-panel">
            <div className="compact-section-head">
              <h2>Beginner Help</h2>
              <p>Quick advice for getting started on UNIVENDA.</p>
            </div>
            <div className="help-card-grid">
              {HELP_CARDS.map((card) => (
                <article className="help-card" key={card.title}>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="panel suggested-freelancers-panel">
          <div className="section-head compact-section-head">
            <div>
              <h2>Suggested Freelancers</h2>
              <p>{filteredFreelancers.length} matching profiles from temporary sample data.</p>
            </div>
            {skill && (
              <button className="secondary-button" onClick={() => setSkill("")}>
                Clear search
              </button>
            )}
          </div>
          <div className="suggested-freelancer-grid">
            {filteredFreelancers.map((freelancer) => (
              <article className="suggested-freelancer-card" key={freelancer.name}>
                <img src={freelancer.image} alt={`${freelancer.name} profile`} />
                <div className="suggested-freelancer-copy">
                  <div>
                    <strong>{freelancer.name}</strong>
                    <span>{freelancer.skill}</span>
                  </div>
                  <p>{freelancer.bio}</p>
                  <div className="freelancer-card-footer">
                    <span>Rating {freelancer.rating}</span>
                    <strong>{freelancer.pricing}</strong>
                  </div>
                </div>
              </article>
            ))}
            {filteredFreelancers.length === 0 && (
              <p className="empty-state">No suggested freelancers match this skill yet.</p>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function GuidanceList({ title, items }) {
  return (
    <article className="guidance-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
