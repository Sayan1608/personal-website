import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { ProfilePortrait } from "@/components/profile-portrait";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { getRecentProjects } from "@/data/github";
import { education, experience, profile, skillGroups } from "@/data/profile";

export default async function Home() {
  const recentProjects = await getRecentProjects();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main">
        <section aria-labelledby="hero-title" className="hero-section site-shell" id="home">
          <div aria-label="Java, APIs, and scalable backend engineering" className="profile-banner">
            <div className="banner-copy">
              <span className="banner-eyebrow"><span className="eyebrow-dot" /> JAVA · BACKEND ENGINEERING</span>
              <p>Thoughtful systems.<br /><span>Built to scale.</span></p>
              <span className="banner-caption">SPRING BOOT <span>/</span> REST APIs <span>/</span> MICROSERVICES</span>
            </div>
            <div aria-hidden="true" className="banner-graphic">
              <span className="banner-orbit banner-orbit-one" />
              <span className="banner-orbit banner-orbit-two" />
              <span className="banner-ring-dot" />
              <span className="banner-node banner-node-one">JAVA<span>01</span></span>
              <span className="banner-node banner-node-two">APIs<span>02</span></span>
              <span className="banner-node banner-node-three">SYSTEMS<span>03</span></span>
              <span className="banner-graphic-cross">✳</span>
              <span className="banner-graphic-index">ENGINEERING FOCUS <span>—</span> 01</span>
            </div>
            <span aria-hidden="true" className="banner-corner">SS / STUDIO</span>
          </div>
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="eyebrow-dot" /> JAVA DEVELOPER <span className="eyebrow-separator">/</span> BENGALURU, INDIA
            </span>
            <h1 id="hero-title">
              Java
              <br />
              <span>developer<span className="hero-period">.</span></span>
            </h1>
            <p className="hero-description">
              I&apos;m <strong>{profile.name}</strong>, a Java developer creating scalable backend systems,
              APIs, and microservices.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experience">
                Explore my work <ArrowDown aria-hidden="true" size={16} />
              </a>
              <a className="button button-quiet" href="#contact">
                Get in touch <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              <a href={profile.linkedIn} rel="noreferrer" target="_blank">
                LinkedIn <ArrowUpRight aria-hidden="true" size={13} />
              </a>
              <span aria-hidden="true" className="social-divider" />
              <a href={profile.github} rel="noreferrer" target="_blank">
                GitHub <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            </div>
          </div>

          <div aria-label="Java backend developer" className="hero-art" role="img">
            <div className="art-grid" />
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="art-center"><ProfilePortrait /></div>
            <div className="art-node node-top"><span className="node-dot" /> SPRING BOOT</div>
            <div className="art-node node-right"><span className="node-dot" /> REST APIs</div>
            <div className="art-node node-bottom"><span className="node-dot" /> MICROSERVICES</div>
            <div className="art-node node-left"><span className="node-dot" /> HIBERNATE</div>
            <span className="art-caption">01 — ENGINEERING FOCUS</span>
            <span className="art-caption art-caption-bottom">SCALABLE BY DESIGN</span>
            <div className="art-asterisk" aria-hidden="true">✳</div>
          </div>

          <a className="scroll-cue" href="#about">
            <span className="scroll-line" /> SCROLL TO EXPLORE
          </a>
        </section>

        <section aria-labelledby="about-title" className="content-section site-shell" id="about">
          <SectionHeading
            description="A little about the engineer behind the code."
            eyebrow="A quick introduction"
            number="01"
            title="About me"
            titleId="about-title"
          />
          <div className="about-layout">
            <div className="about-intro">
              <span className="about-mark" aria-hidden="true">“</span>
              <h3>Thoughtful engineering.<br /><span>Reliable solutions.</span></h3>
            </div>
            <div className="about-copy">
              {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="about-facts">
                <div className="fact-item">
                  <MapPin aria-hidden="true" size={16} />
                  <div><span>Based in</span><strong>Bengaluru, India</strong></div>
                </div>
                <div className="fact-item">
                  <BriefcaseBusiness aria-hidden="true" size={16} />
                  <div><span>Focus</span><strong>Backend development</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="skills-title" className="content-section skills-section" id="skills">
          <div className="site-shell">
            <SectionHeading
              description="The technologies I work with to build dependable backend systems."
              eyebrow="What I work with"
              number="02"
              title="Technical skills"
              titleId="skills-title"
            />
            <div className="skills-grid">
              {skillGroups.map(({ label, skills }, index) => (
                <article className="skill-card" key={label}>
                  <div className="skill-card-top">
                    <span className="skill-number">0{index + 1}</span>
                    <Code2 aria-hidden="true" size={18} strokeWidth={1.6} />
                  </div>
                  <h3>{label}</h3>
                  <ul>
                    {skills.map((skill) => <li key={skill}>{skill}<ArrowUpRight aria-hidden="true" size={14} /></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="experience-title" className="content-section site-shell" id="experience">
          <SectionHeading
            description="Roles and education as listed in my LinkedIn profile."
            eyebrow="The journey so far"
            number="03"
            title="Experience & education"
            titleId="experience-title"
          />
          <div className="resume-grid">
            <div className="timeline">
              <div className="resume-column-heading">
                <BriefcaseBusiness aria-hidden="true" size={17} />
                <h3>Work experience</h3>
              </div>
              {experience.map(({ company, role, additionalRole, dateLabel, current, location, description }) => (
                <article className="timeline-entry" key={company}>
                  <span aria-hidden="true" className={`timeline-marker${current ? " is-current" : ""}`} />
                  <div className="timeline-heading">
                    <div>
                      <h4>{company}</h4>
                      <p className="timeline-role">{role}</p>
                      {additionalRole && <p className="timeline-extra">{additionalRole}</p>}
                    </div>
                    <span className="timeline-date">{dateLabel}</span>
                  </div>
                  {location && <p className="timeline-location"><MapPin aria-hidden="true" size={13} /> {location}</p>}
                  {description && <p className="timeline-description">{description}</p>}
                  {current && <span className="current-badge"><span className="current-dot" /> CURRENT</span>}
                </article>
              ))}
            </div>

            <div className="education-column">
              <div className="resume-column-heading">
                <GraduationCap aria-hidden="true" size={18} />
                <h3>Education</h3>
              </div>
              {education.map(({ institution, degree, field, dateLabel }) => (
                <article className="education-card" key={institution}>
                  <h4>{institution}</h4>
                  <p>{degree}</p>
                  {field && <p className="education-field">{field}</p>}
                  {dateLabel && <span className="education-date">{dateLabel}</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" className="content-section projects-section" id="projects">
          <div className="site-shell">
            <SectionHeading
              description="Five public repositories, ordered by their latest push to GitHub."
              eyebrow="Selected work"
              number="04"
              title="Projects"
              titleId="projects-title"
            />
            {recentProjects.status === "success" && recentProjects.projects.length > 0 ? (
              <div className="project-grid">
                {recentProjects.projects.map((project, index) => (
                  <article className="project-card" key={project.id}>
                    <a
                      aria-label={`${project.name} on GitHub (opens in a new tab)`}
                      className="project-card-link"
                      href={project.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <div className="project-card-top">
                        <span className="project-index">PROJECT / 0{index + 1}</span>
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </div>
                      <h3>{project.name}</h3>
                      <p>{project.description || "No description provided for this repository."}</p>
                      <div className="project-card-footer">
                        {project.language ? <span className="project-language">{project.language}</span> : <span />}
                        <span className="project-pushed">
                          Pushed{" "}
                          <time dateTime={project.pushedAt}>
                            {new Intl.DateTimeFormat("en", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              timeZone: "UTC"
                            }).format(new Date(project.pushedAt))}
                          </time>
                        </span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <div className={`projects-message${recentProjects.status === "error" ? " is-error" : ""}`}>
                <Code2 aria-hidden="true" size={20} />
                <div>
                  <h3>
                    {recentProjects.status === "error"
                      ? "Projects couldn’t be loaded right now."
                      : "No public projects found."}
                  </h3>
                  <p>
                    {recentProjects.status === "error"
                      ? "You can still browse the latest repositories directly on GitHub."
                      : "Visit GitHub to see all of Sayan’s public repositories."}
                  </p>
                </div>
                <a href={profile.github} rel="noreferrer" target="_blank">
                  View GitHub <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="achievements-title" className="content-section site-shell achievements-section">
          <SectionHeading
            description="Only verifiable milestones belong here."
            eyebrow="Recognition"
            number="05"
            title="Achievements"
            titleId="achievements-title"
          />
          <div className="achievement-note">
            <span className="achievement-star" aria-hidden="true">✳</span>
            <div>
              <h3>No achievements listed.</h3>
              <p>Achievements weren&apos;t included in the profile provided.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact-section" id="contact">
          <div className="site-shell contact-inner">
            <div className="contact-copy">
              <span className="eyebrow"><span className="eyebrow-dot" /> 06 / CONTACT <span className="eyebrow-separator">/</span> OPEN TO A CONVERSATION</span>
              <h2 id="contact-title">Have something<br /><span>good in mind?</span></h2>
              <p>For a conversation about backend engineering, opportunities, or a good technical challenge — feel free to reach out.</p>
              <a className="button button-primary contact-button" href={`mailto:${profile.email}`}>
                Say hello <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
            <div className="contact-details">
              <span className="contact-label">GET IN TOUCH</span>
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <span className="contact-icon"><Mail aria-hidden="true" size={17} /></span>
                <span><span className="contact-sublabel">EMAIL</span>{profile.email}</span>
                <ArrowUpRight aria-hidden="true" className="contact-arrow" size={15} />
              </a>
              <a className="contact-link" href={`tel:${profile.phoneHref}`}>
                <span className="contact-icon"><Phone aria-hidden="true" size={17} /></span>
                <span><span className="contact-sublabel">PHONE</span>{profile.phone}</span>
                <ArrowUpRight aria-hidden="true" className="contact-arrow" size={15} />
              </a>
              <a
                className="contact-link resume-download"
                download="Sayan-Sengupta-LinkedIn-Profile.pdf"
                href="/profile.pdf"
              >
                <span className="contact-icon"><Download aria-hidden="true" size={17} /></span>
                <span><span className="contact-sublabel">PROFILE DOCUMENT</span>Download LinkedIn profile PDF</span>
                <ArrowDown aria-hidden="true" className="contact-arrow" size={15} />
              </a>
              <div className="contact-socials">
                <a href={profile.linkedIn} rel="noreferrer" target="_blank">
                  <BriefcaseBusiness aria-hidden="true" size={16} /> LinkedIn <ArrowRight aria-hidden="true" size={13} />
                </a>
                <a href={profile.github} rel="noreferrer" target="_blank">
                  <Code2 aria-hidden="true" size={16} /> GitHub <ArrowRight aria-hidden="true" size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <a className="brand footer-brand" href="#home">
            <span aria-hidden="true" className="brand-mark">ss.</span>
            <span className="brand-name">Sayan Sengupta</span>
          </a>
          <span>Java developer · Bengaluru, India</span>
          <a className="back-to-top" href="#home">BACK TO TOP <ArrowUpRight aria-hidden="true" size={13} /></a>
        </div>
      </footer>
    </>
  );
}
