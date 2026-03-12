import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock, faCalendarCheck, faComments, faBolt, faEnvelope, faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin, faGithub, faInstagram, faWhatsapp, faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

// ─── Dados ────────────────────────────────────────────────────────────────────

const CONTACT_METHODS = [
  {
    icon: faWhatsapp,
    title: "WhatsApp",
    description: "Resposta rápida para conversar sobre projetos",
    href: "https://wa.me/5511966403523?text=Olá%20Juliana,%20vi%20seu%20portfólio!",
    primary: true,
  },
  {
    icon: faEnvelope,
    title: "E-mail",
    description: "Para propostas ou contato profissional",
    href: "mailto:julimaria2003@gmail.com?subject=Contato%20pelo%20portfólio",
  },
  {
    icon: faLinkedin,
    title: "LinkedIn",
    description: "Conecte-se profissionalmente",
    href: "https://www.linkedin.com/in/juliana-jacinto/",
  },
  {
    icon: faGithub,
    title: "GitHub",
    description: "Veja meus projetos e códigos",
    href: "https://github.com/julianajacinto",
  },
];

const STATUS_CARDS = [
  {
    icon: faCalendarCheck,
    label: "Disponibilidade",
    value: "Disponível",
    detail: "Aceitando novos projetos",
    badge: { text: "Aberta", pulse: true },
  },
  {
    icon: faClock,
    label: "Resposta",
    value: "Até 24h",
    detail: "Em dias úteis",
  },
  {
    icon: faComments,
    label: "Idiomas",
    value: "PT · EN",
    detail: "Português e inglês",
  },
  {
    icon: faBolt,
    label: "Modalidade",
    value: "Remoto",
    detail: "Presencial sob consulta",
  },
];

const SOCIALS = [
  { icon: faLinkedin,  href: "https://www.linkedin.com/in/juliana-jacinto/", label: "LinkedIn" },
  { icon: faGithub,    href: "https://github.com/julianajacinto",            label: "GitHub" },
  {icon: faXTwitter, href: "https://twitter.com/gleppy_arts",                label: "Twitter" },
  { icon: faInstagram, href: "https://www.instagram.com/jukka.arts/",        label: "Instagram" },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Componentes ──────────────────────────────────────────────────────────────

function SectionHeader() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-10 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full" />
        <h2 id="contato-title" className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
          Entre em <span className="text-lime-400">Contato</span>
        </h2>
      </div>
      <p className="text-slate-400 text-base ml-4 pl-3 border-l border-slate-800">
        Escolha o canal de sua preferência — respondo rápido!
      </p>
    </div>
  );
}

// Card primário (WhatsApp em destaque, largura total)
function PrimaryContactCard({ icon, title, description, href }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-5 rounded-2xl bg-lime-500 border border-lime-400
        hover:bg-lime-400 transition-all duration-200 group col-span-2"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-900/20 flex items-center justify-center shrink-0">
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-slate-900 group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-slate-800 text-xs">{description}</p>
      </div>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="w-4 h-4 text-slate-900/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </a>
  );
}

// Cards secundários
function SecondaryContactCard({ icon, title, description, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-5 rounded-2xl border border-slate-700/50
        bg-slate-900/60 backdrop-blur-sm hover:border-lime-400/40 hover:bg-slate-900
        transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-400/20
        flex items-center justify-center shrink-0">
        <FontAwesomeIcon icon={icon} className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-100 text-sm">{title}</p>
        <p className="text-slate-400 text-xs truncate">{description}</p>
      </div>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="w-3 h-3 text-slate-600 group-hover:text-lime-400/60
          group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
      />
    </a>
  );
}

function StatusCard({ icon, label, value, detail, badge }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-700/50
      bg-slate-900/60 backdrop-blur-sm hover:border-slate-600/70 transition-all duration-200">
      <div className="flex items-center justify-between">
        <FontAwesomeIcon icon={icon} className="w-4 h-4 text-lime-400/70" />
        {badge && (
          <span className="flex items-center gap-1 text-[10px] font-semibold
            text-lime-400 bg-lime-500/10 border border-lime-400/20 px-2 py-0.5 rounded-full">
            {badge.pulse && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />}
            {badge.text}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</p>
      <p className="text-base font-bold text-slate-100 leading-tight">{value}</p>
      <p className="text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5">
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
        Redes sociais
      </p>
      <div className="flex gap-2.5">
        {SOCIALS.map(({ icon, href, label }) => (
        <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl
              bg-slate-800/60 border border-slate-700/40 text-slate-500
              hover:bg-slate-800 hover:border-lime-400/40 hover:text-lime-400
              transition-all duration-200 group"
          >
            <FontAwesomeIcon icon={icon} className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-[10px] font-medium text-slate-600 group-hover:text-slate-400 transition-colors duration-200">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────

export default function ContactSection() {
  const left  = useInView({ threshold: 0.1 });
  const right = useInView({ threshold: 0.1 });

  const [primary, ...secondary] = CONTACT_METHODS;

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        py-20 sm:py-28 overflow-hidden"
    >
      {/* Padrão de pontos */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-contact" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-lime-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-contact)" />
        </svg>
      </div>

      {/* Linha de separação topo */}
      <div className="absolute top-0 inset-x-0 h-1
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader />

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Esquerda — formas de contato (principal) */}
          <div
            ref={left.ref}
            style={{ transitionDelay: "100ms" }}
            className={`space-y-3 transition-all duration-700
              ${left.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Canais de contato
            </h3>
            
            <div className="flex flex-col gap-4">
              <PrimaryContactCard {...primary} />
              {secondary.map((method) => (
                <SecondaryContactCard key={method.title} {...method} />
              ))}
            </div>
          </div>

          {/* Direita — status + redes sociais */}
          <div
            ref={right.ref}
            style={{ transitionDelay: "250ms" }}
            className={`space-y-3 transition-all duration-700
              ${right.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Disponibilidade
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {STATUS_CARDS.map((card) => (
                <StatusCard key={card.label} {...card} />
              ))}
            </div>
            <SocialLinks />
          </div>

        </div>
      </div>
    </section>
  );
}