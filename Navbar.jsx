import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAME_FALLBACK } from "../../utils/constants.js";
import { PROFILE, NAV_LINKS } from "../../data/portfolio.js";

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--glass-border)" : "1px solid transparent",
      }}
    >
      <nav aria-label="Main" className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 font-semibold tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-primary)", fontSize: "1.05rem" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--status-ok)", boxShadow: "0 0 8px var(--status-ok)" }}
            aria-hidden="true"
          />
          {PROFILE.name || NAME_FALLBACK}
        </a>

        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className="nav-link px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: active === l.id ? "var(--text-primary)" : "var(--text-secondary)",
                background: active === l.id ? "var(--glass)" : "transparent",
              }}
            >
              <span style={{ color: "var(--accent)", opacity: 0.7, fontSize: "0.7rem" }} aria-hidden="true">
                {l.index}
              </span>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, var(--accent), var(--accent-violet))",
              color: "#050505",
            }}
          >
            Let's talk
          </a>
        </div>

        <button
          className="sm:hidden p-3 rounded-lg"
          style={{ color: "var(--text-primary)" }}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav-menu"
          className="sm:hidden px-5 pb-4 flex flex-col gap-1"
          style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(16px)" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === l.id ? "true" : undefined}
              className="px-3 py-2.5 rounded-lg text-sm flex items-center gap-2"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-primary)" }}
            >
              <span style={{ color: "var(--accent)", opacity: 0.7, fontSize: "0.7rem" }} aria-hidden="true">
                {l.index}
              </span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
