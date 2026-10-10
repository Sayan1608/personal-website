"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a className="brand" href="#home" aria-label="Sayan Sengupta — home">
          <span className="brand-mark" aria-hidden="true">ss.</span>
          <span className="brand-name">Sayan Sengupta</span>
        </a>

        <nav aria-label="Main navigation" className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {links.map(({ href, label }) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a className="header-cta" href="#contact">
            Let&apos;s talk <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </div>
      <nav
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        inert={!menuOpen}
      >
        {links.map(({ href, label }, index) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>
            {label}
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        ))}
      </nav>
    </header>
  );
}
