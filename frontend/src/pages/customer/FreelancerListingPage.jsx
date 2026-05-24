import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { freelancerDomains } from "../../data/freelancerDomains.js";

const benefits = [
  {
    title: "Start with guided confidence",
    detail: "Explore domains before committing, understand what to learn, and choose a path that matches your strengths."
  },
  {
    title: "Turn learning into proof",
    detail: "Use projects, portfolios, and campus work samples to show clients what you can actually deliver."
  },
  {
    title: "Practice in a student marketplace",
    detail: "UNIVENDA gives students a safer place to test services, pricing, communication, and delivery habits."
  }
];

const growthCards = [
  "Build portfolio-ready projects from real needs",
  "Learn how to package your skill into a sellable service",
  "Understand beginner pricing before talking to clients",
  "Discover tools and resources for each career path"
];

const learningCards = [
  {
    title: "Explore",
    detail: "Compare domains and see where your interests, tools, and earning goals overlap."
  },
  {
    title: "Practice",
    detail: "Follow beginner projects that are small enough to finish and strong enough to showcase."
  },
  {
    title: "Publish",
    detail: "Create samples, list your service, and improve from feedback instead of waiting to feel perfect."
  }
];

const successSteps = [
  "Choose one domain",
  "Finish two starter projects",
  "Create a clean portfolio proof",
  "Offer a small paid service on UNIVENDA"
];

export function FreelancerListingPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
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

  const matchingDomains = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return freelancerDomains;
    }

    return freelancerDomains.filter((domain) => domain.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <AppShell title="Freelancers">
      <div className="freelancers-page career-hub-page">
        <section className="freelancers-hero career-hero">
          <div className="freelancers-hero-copy">
            <h2>Explore careers, learn the path, and grow into a student freelancer.</h2>
            <p>
              Pick a domain when you are ready. Until then, use UNIVENDA to understand opportunities, learning paths,
              project ideas, and how students can turn skills into paid services.
            </p>
          </div>
          <div className="freelancers-search-card" ref={searchRef}>
            <label className="field">
              <span>Search a career domain</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIsSuggestionsOpen(true);
                }}
                onFocus={() => setIsSuggestionsOpen(true)}
                onClick={() => setIsSuggestionsOpen(true)}
                placeholder="Try Web Development"
                autoComplete="off"
              />
            </label>
            {isSuggestionsOpen && matchingDomains.length > 0 && (
              <div className="suggestions-dropdown" role="listbox" aria-label="Career domain suggestions">
                {matchingDomains.map((domain) => (
                  <Link
                    className="suggestion-item"
                    role="option"
                    key={domain.slug}
                    to={`/freelancers/${domain.slug}`}
                    onClick={() => setIsSuggestionsOpen(false)}
                  >
                    <strong>{domain.name}</strong>
                    <span>Open detailed learning and earning guide</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="career-section-grid">
          {benefits.map((benefit) => (
            <article className="career-info-card" key={benefit.title}>
              <span>{benefit.title.slice(0, 2).toUpperCase()}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.detail}</p>
            </article>
          ))}
        </section>

        <section className="panel career-panel">
          <div className="compact-section-head">
            <h2>Student Growth Opportunities</h2>
            <p>Build confidence before you sell. Every domain guide is designed for students starting from zero.</p>
          </div>
          <div className="growth-opportunity-grid">
            {growthCards.map((item) => (
              <div className="growth-opportunity" key={item}>
                <span />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <div className="freelancers-main-grid">
          <section className="panel career-panel">
            <div className="compact-section-head">
              <h2>Learning Experience</h2>
              <p>UNIVENDA turns career discovery into a practical loop.</p>
            </div>
            <div className="learning-card-grid">
              {learningCards.map((card) => (
                <article className="learning-card" key={card.title}>
                  <strong>{card.title}</strong>
                  <p>{card.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel career-panel">
            <div className="compact-section-head">
              <h2>Success Path</h2>
              <p>A simple route from curious student to first service listing.</p>
            </div>
            <ol className="success-path-list">
              {successSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        <section className="panel freelancers-trending-panel">
          <div className="section-head compact-section-head">
            <div>
              <h2>Featured Domains</h2>
              <p>Open a domain page to see skills, tools, roadmap, projects, pricing, and growth guidance.</p>
            </div>
            <span className="result-count">{freelancerDomains.length} guides</span>
          </div>
          <div className="domain-card-grid">
            {freelancerDomains.map((domain) => (
              <Link className="domain-card" to={`/freelancers/${domain.slug}`} key={domain.slug}>
                <span>{domain.initials}</span>
                <div>
                  <strong>{domain.name}</strong>
                  <p>{domain.impact}</p>
                </div>
                <small>Explore guide</small>
              </Link>
            ))}
          </div>
        </section>

        {!user ? (
          <section className="register-cta-panel">
            <div>
              <h2>Ready to turn learning into earning?</h2>
              <p>Register as a student to build your profile, list services, and start growing on UNIVENDA.</p>
            </div>
            <Link className="primary-button" to="/register/student">
              Register Now
            </Link>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
