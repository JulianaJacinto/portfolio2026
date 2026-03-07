import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt, faEnvelope, faPhone,
  faCheckCircle, faPaperPlane, faClock,
  faCalendarCheck, faComments, faBolt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin, faGithub, faInstagram, faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

// ─── Dados ────────────────────────────────────────────────────────────────────
const CONTACT_INFO = [
  { icon: faMapMarkerAlt, label: "Localização", value: "Cachoeira Paulista – SP" },
  { icon: faEnvelope,     label: "E-mail",       value: "julimaria2003@gmail.com", href: "mailto:julimaria2003@gmail.com" },
  { icon: faPhone,        label: "Telefone",     value: "(11) 96640-3523",         href: "https://wa.me/5511966403523" },
];

const SOCIALS = [
  { icon: faLinkedin,  href: "https://www.linkedin.com/in/juliana-jacinto/", label: "LinkedIn" },
  { icon: faGithub,    href: "https://github.com/julianajacinto",            label: "GitHub" },
  { icon: faWhatsapp,  href: "https://wa.me/5511966403523",                  label: "WhatsApp" },
  { icon: faInstagram, href: "https://www.instagram.com/jukka.arts/",        label: "Instagram" },
];

// Cartões de status — os que você quiser editar ficam aqui
const STATUS_CARDS = [
  {
    icon: faCalendarCheck,
    label: "Disponibilidade",
    value: "Disponível",
    detail: "Aceitando novos projetos",
    positive: true,
  },
  {
    icon: faClock,
    label: "Tempo de resposta",
    value: "Até 24h",
    detail: "Em dias úteis",
    positive: null,
  },
  {
    icon: faComments,
    label: "Idiomas",
    value: "PT · EN",
    detail: "Português e inglês",
    positive: null,
  },
  {
    icon: faBolt,
    label: "Modalidade",
    value: "Remoto",
    detail: "Presencial sob consulta",
    positive: null,
  },
];

// ─── Hook: dispara ao entrar na viewport ──────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Campo de formulário ──────────────────────────────────────────────────────
function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-300 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  block w-full rounded-xl bg-slate-800/60 border border-slate-700/60
  px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500
  focus:outline-none focus:border-lime-400/60 focus:ring-1 focus:ring-lime-400/30
  hover:border-slate-600 transition-all duration-200 backdrop-blur-sm
`;

// ─── Formulário ───────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[340px] gap-4
        rounded-2xl border border-lime-400/20 bg-slate-900/50 backdrop-blur-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-lime-500/10 border border-lime-400/30
          flex items-center justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-lime-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">Mensagem enviada!</h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Obrigada pelo contato. Retornarei em breve!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nome" id="name">
          <input id="name" name="name" type="text" placeholder="Seu nome"
            value={form.name} onChange={handleChange} required className={inputClass} />
        </Field>
        <Field label="E-mail" id="email">
          <input id="email" name="email" type="email" placeholder="exemplo@email.com"
            value={form.email} onChange={handleChange} required className={inputClass} />
        </Field>
      </div>
      <Field label="Assunto" id="subject">
        <input id="subject" name="subject" type="text"
          placeholder="Desenvolvimento de site, consultoria..."
          value={form.subject} onChange={handleChange} required className={inputClass} />
      </Field>
      <Field label="Mensagem" id="message">
        <textarea id="message" name="message" rows={5}
          placeholder="Conte um pouco sobre seu projeto ou dúvida..."
          value={form.message} onChange={handleChange} required
          className={`${inputClass} resize-none`} />
      </Field>
      <button type="submit"
        className="w-full flex items-center justify-center gap-2.5
          px-6 py-3.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-900
          font-semibold text-sm shadow-lg shadow-lime-700/20 hover:shadow-lime-600/30
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
        Enviar mensagem
      </button>
    </form>
  );
}

// ─── Painel lateral ───────────────────────────────────────────────────────────
function InfoPanel() {
  return (
    <div className="flex flex-col gap-5 h-full">

      {/* ── Grid de status ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {STATUS_CARDS.map(({ icon, label, value, detail, positive }) => (
          <div key={label}
            className="flex flex-col gap-2 p-4 rounded-2xl
              bg-slate-900/60 border border-slate-700/50 backdrop-blur-sm
              hover:border-slate-600/70 transition-all duration-200">
            <div className="flex items-center justify-between">
              <FontAwesomeIcon icon={icon} className="w-4 h-4 text-lime-400/70" />
              {positive && (
                <span className="flex items-center gap-1 text-[10px] font-semibold
                  text-lime-400 bg-lime-500/10 border border-lime-400/20
                  px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  Aberta
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {label}
            </p>
            <p className="text-base font-bold text-slate-100 leading-tight">{value}</p>
            <p className="text-xs text-slate-500">{detail}</p>
          </div>
        ))}
      </div>

      {/* ── Dados de contato ───────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50
        backdrop-blur-sm p-5 space-y-4">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Contato direto
        </p>
        {CONTACT_INFO.map(({ icon, label, value, href }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl
              bg-lime-500/10 border border-lime-400/20
              flex items-center justify-center">
              <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5 text-lime-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                {label}
              </p>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-lime-400
                    transition-colors duration-200 truncate block">
                  {value}
                </a>
              ) : (
                <p className="text-sm text-slate-300 truncate">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Redes sociais ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50
        backdrop-blur-sm p-5">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
          Redes sociais
        </p>
        <div className="flex gap-2.5">
          {SOCIALS.map(({ icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl
                bg-slate-800/60 border border-slate-700/40 text-slate-500
                hover:bg-slate-800 hover:border-lime-400/40 hover:text-lime-400
                transition-all duration-200 group">
              <FontAwesomeIcon icon={icon}
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-[10px] font-medium text-slate-600
                group-hover:text-slate-400 transition-colors duration-200">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export default function ContactSection() {
  const header    = useInView({ threshold: 0.2 });
  const formPanel = useInView({ threshold: 0.1 });
  const infoPanel = useInView({ threshold: 0.1 });

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        py-20 sm:py-28 overflow-hidden"
    >
      {/* Padrão de pontos */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-lime-500" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Linha de separação topo */}
      <div className="absolute top-0 inset-x-0 h-1
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
        <div
          ref={header.ref}
          className={`mb-14 transition-all duration-700
            ${header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-10 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full" />
            <h2 id="contato-title"
              className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              Entre em <span className="text-lime-400">Contato</span>
            </h2>
          </div>
          <p className="text-slate-400 text-base ml-4 pl-3 border-l border-slate-800">
            Tem um projeto em mente ou quer trabalhar juntos? Me envie uma mensagem!
          </p>
        </div>

        {/* ── Grid ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Formulário — entra da esquerda */}
          <div
            ref={formPanel.ref}
            style={{ transitionDelay: "100ms" }}
            className={`rounded-2xl border border-slate-700/50 bg-slate-900/50
              backdrop-blur-sm p-8 transition-all duration-700
              ${formPanel.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h3 className="text-lg font-bold text-slate-100 mb-6">
              Envie uma mensagem
            </h3>
            <ContactForm />
          </div>

          {/* Painel lateral — entra da direita */}
          <div
            ref={infoPanel.ref}
            style={{ transitionDelay: "200ms" }}
            className={`transition-all duration-700
              ${infoPanel.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <InfoPanel />
          </div>
        </div>
      </div>
    </section>
  );
}