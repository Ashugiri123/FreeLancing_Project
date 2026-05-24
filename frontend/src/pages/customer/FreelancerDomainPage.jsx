import { Link, Navigate, useParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { freelancerDomains, getFreelancerDomain } from "../../data/freelancerDomains.js";

export function FreelancerDomainPage() {
  const { domainSlug } = useParams();
  const { user } = useAuth();
  const domain = getFreelancerDomain(domainSlug);

  if (!domain) {
    return <Navigate to="/freelancers" replace />;
  }

  return (
    <AppShell title={domain.name}>
      <div className="domain-detail-page">
        <Link className="back-link domain-back-link" to="/freelancers">
          Back to career exploration
        </Link>

        <section className="domain-detail-hero">
          <div className="domain-hero-copy">
            <span>{domain.initials}</span>
            <h2>{domain.name}</h2>
            <p>{domain.summary}</p>
            <div className="domain-hero-actions">
              <a className="primary-button" href="#roadmap">
                View Roadmap
              </a>
              <a className="secondary-button" href="#earning">
                Earning Guide
              </a>
            </div>
          </div>
          <aside className="domain-overview-card">
            <h3>Domain Overview</h3>
            <p>{domain.impact}</p>
            <div>
              <strong>{domain.projects.length}</strong>
              <span>starter projects</span>
            </div>
          </aside>
        </section>

        <section className="domain-detail-grid">
          <DomainList title="Required skills" items={domain.requiredSkills} />
          <DomainList title="Recommended tools" items={domain.tools} />
          <DomainList id="roadmap" title="Beginner roadmap" items={domain.roadmap} ordered />
          <DomainList title="Suggested projects" items={domain.projects} />
          <DomainList title="Freelance opportunities" items={domain.opportunities} />
          <DomainList id="earning" title="Beginner earning guidance" items={domain.pricing} />
          <DomainList title="Learning resources" items={domain.resources} />
          <DomainList title="How UNIVENDA helps students grow" items={domain.growth} />
        </section>

        <section className="panel domain-next-panel">
          <div className="compact-section-head">
            <h2>Explore Other Domains</h2>
            <p>Compare nearby paths before choosing what to practice first.</p>
          </div>
          <div className="domain-mini-grid">
            {freelancerDomains
              .filter((item) => item.slug !== domain.slug)
              .map((item) => (
                <Link className="domain-mini-card" to={`/freelancers/${item.slug}`} key={item.slug}>
                  <span>{item.initials}</span>
                  <strong>{item.name}</strong>
                </Link>
              ))}
          </div>
        </section>

        {!user ? (
          <section className="register-cta-panel">
            <div>
              <h2>Start your {domain.name} journey on UNIVENDA</h2>
              <p>Register as a student to build proof, list services, and find your first campus clients.</p>
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

function DomainList({ id, title, items, ordered = false }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <article className="domain-detail-card" id={id}>
      <h3>{title}</h3>
      <ListTag>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </article>
  );
}
