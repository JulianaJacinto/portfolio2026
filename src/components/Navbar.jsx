"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Bars3Icon, XMarkIcon, UserIcon, SparklesIcon, FolderIcon, 
  EnvelopeIcon, ArrowDownOnSquareIcon, HomeIcon, MapIcon, BriefcaseIcon 
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const NAV_LINKS = [
  { href: "#inicio", label: "Início", icon: HomeIcon },
  { href: "#sobre", label: "Sobre", icon: UserIcon },
  { href: "#jornada", label: "Jornada", icon: MapIcon },
  { href: "#habilidades", label: "Habilidades", icon: SparklesIcon },
  { href: "#servicos", label: "Serviços", icon: BriefcaseIcon },
  { href: "#projetos", label: "Projetos", icon: FolderIcon },
  { href: "#contato", label: "Contato", icon: EnvelopeIcon },
];

// Altura do header para compensar o scroll
const HEADER_OFFSET = 80;

// Função centralizada de navegação suave com offset
function scrollToSection(href) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── NavLink Desktop ──────────────────────────────────────────────────────────
function NavLink({ href, label, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(href)}
      className={`relative px-1 py-2 font-semibold text-sm transition-colors duration-300 ${
        isActive ? "text-lime-400" : "text-slate-200 hover:text-lime-400"
      }`}
    >
      {label}
      {/* Underline animado */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-lime-500 rounded-full transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </button>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, activeSection, onNavigate }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Painel deslizante */}
      <div
        className={`fixed top-20 left-0 right-0 bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border-b border-lime-500/30 z-40 lg:hidden transition-all duration-400 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;

              return (
                <button
                  key={link.href}
                  onClick={() => {
                    onNavigate(link.href);
                    onClose();
                  }}
                  style={{
                    // Stagger de entrada: só roda quando o menu abre
                    transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                  }}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold w-full text-left
                    transition-all duration-300
                    ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }
                    ${
                      isActive
                        ? "bg-gradient-to-r from-lime-500/20 to-lime-500/10 text-lime-400 border-l-4 border-lime-500"
                        : "text-slate-200 hover:bg-slate-800/50 hover:text-lime-400 border-l-4 border-transparent"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-lime-400" : "text-slate-400 group-hover:text-lime-400"
                    }`}
                  />
                  <span className="flex-1">{link.label}</span>

                  {/* Indicador de ativo */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="my-2 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

            {/* Botão baixar currículo */}
            <a
              href="/julianajacinto.github.io/doc/JulianaJacinto_curriculo.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              style={{ transitionDelay: isOpen ? `${NAV_LINKS.length * 60}ms` : "0ms" }}
              className={`mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600
                px-5 py-3.5 text-white font-semibold shadow-lg
                hover:shadow-xl hover:shadow-lime-500/50 hover:scale-105
                active:scale-95 transition-all duration-300
                ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              <ArrowDownOnSquareIcon className="w-5 h-5" />
              Baixar currículo
            </a>

            {/* Redes sociais */}
            <div
              style={{ transitionDelay: isOpen ? `${(NAV_LINKS.length + 1) * 60}ms` : "0ms" }}
              className={`mt-6 flex justify-center gap-4 border-t border-slate-800 pt-6
                transition-all duration-300
                ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              <SocialLink href="https://github.com/julianajacinto" label="GitHub">
                <FontAwesomeIcon icon={faGithub} className="w-7 h-7" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/juliana-jacinto/" label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="w-7 h-7" />
              </SocialLink>
              <SocialLink href="https://wa.me/5511966403523" label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/jukka.arts/" label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
              </SocialLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

// ─── Social Link helper ───────────────────────────────────────────────────────
function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition-all duration-300 hover:scale-110"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {children}
      </svg>
    </a>
  );
}

// ─── Navbar principal ─────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [scrolled, setScrolled] = useState(false);

  // Scroll suave com offset + fecha menu mobile
  const handleNavigate = useCallback((href) => {
    scrollToSection(href);
    setActiveSection(href); // feedback imediato ao clicar
  }, []);

  // IntersectionObserver: detecta qual seção está visível
  useEffect(() => {
    const observers = [];

    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(href);
          }
        },
        {
          // Dispara quando a seção entra nos 30% centrais da viewport
          rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Detecta scroll para encolher o header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <button
            onClick={() => handleNavigate("#inicio")}
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
            aria-label="Voltar ao início"
          >
            Jukka.Dev
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href}
                onClick={handleNavigate}
              />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="/julianajacinto.github.io/doc/JulianaJacinto_curriculo.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full inline-flex items-center gap-2 bg-lime-500 px-6 py-2.5 text-white font-semibold shadow-sm hover:shadow-lg hover:shadow-lime-500/20 hover:scale-105 transition-all duration-300"
            >
              Baixar currículo
              <ArrowDownOnSquareIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors duration-300 text-slate-200"
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 rotate-90 transition-transform duration-300" />
            ) : (
              <Bars3Icon className="w-6 h-6 transition-transform duration-300" />
            )}
          </button>
        </nav>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </header>
  );
}