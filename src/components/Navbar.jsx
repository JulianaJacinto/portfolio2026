"use client"; 

import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, UserIcon, SparklesIcon, FolderIcon, EnvelopeIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";


const NAV_LINKS = [
  { href: "#sobre", label: "Sobre", icon: UserIcon },
  { href: "#habilidades", label: "Habilidades", icon: SparklesIcon },
  { href: "#projetos", label: "Projetos", icon: FolderIcon },
  { href: "#contato", label: "Contato", icon: EnvelopeIcon }
];

// Navigation Link Component with active state
function NavLink({ href, label, isActive, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-1 py-2 font-semibold transition-colors duration-300 ${
        isActive
          ? "text-lime-400"
          : "text-slate-200 hover:text-lime-400"
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-500 to-lime-400 rounded-full"></span>
      )}
    </a>
  );
}

// Mobile Menu Component - MELHORADO
function MobileMenu({ isOpen, onClose, activeSection }) {
  return (
    <>
      {/* Backdrop with smooth animation */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu - Slide from top */}
      <div
        className={`fixed top-20 left-0 right-0 bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border-b border-lime-500/30 z-40 lg:hidden transition-all duration-500 transform ${
          isOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  style={{
                    animation: isOpen ? `slideInLeft 0.5s ease-out ${index * 0.1}s both` : "none"
                  }}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-lime-500/20 to-lime-500/10 text-lime-400 border-l-4 border-lime-500 shadow-lime-500/20"
                      : "text-slate-200 hover:bg-slate-800/50 hover:text-lime-400 border-l-4 border-transparent"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-lime-400" : "text-slate-400 group-hover:text-lime-400"}`} />
                  <span className="flex-1">{link.label}</span>
                </a>
              );
            })}

            {/* Divider */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent"></div>

            {/* Download CV Button */}
            <a
              href="/cv"
              onClick={onClose}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 px-5 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-lime-500/50 hover:scale-105 transition-all duration-300 active:scale-95"
              style={{
                animation: isOpen ? `slideInUp 0.5s ease-out 0.4s both` : "none"
              }}
            >
              <ArrowDownOnSquareIcon className="w-5 h-5" />
              Download CV
            </a>

            {/* Social Links Section - Optional */}
            <div className="mt-6 flex justify-center gap-4 border-t border-slate-800 pt-6">
              <a
                href="https://github.com/julianajacinto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/juliana-jacinto/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jukka.arts/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"/>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#sobre");
  const [scrolled, setScrolled] = useState(false);

  // Track active section and scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className={`flex items-center justify-between rounded-full backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "bg-slate-900/90 border border-lime-500/20 shadow-xl shadow-lime-500/5"
              : "bg-slate-900/70 border border-lime-500/30 shadow-lg"
          } px-6 py-4`}
        >
          {/* Logo */}
          <a
            href="/"
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
            aria-label="Juliana Jacinto - Voltar ao início"
          >
            Jukka.Dev
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href}
              />
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/cv"
              className="rounded-full bg-gradient-to-r from-lime-500 to-lime-600 px-6 py-2.5 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-lime-500/50 hover:scale-105 transition-all duration-300"
              aria-label="Download currículo"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors duration-300 text-slate-200"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Bars3Icon className="w-6 h-6 transition-transform duration-300" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        activeSection={activeSection}
      />
    </header>
  );
}