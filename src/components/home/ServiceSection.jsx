import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode, faLayerGroup, faPenRuler, faServer, faHeadset, faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { faWordpress } from "@fortawesome/free-brands-svg-icons";

// ─── Dados ────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: faCode,
    title: "Desenvolvimento Front-End",
    description: "Interfaces modernas, responsivas e acessíveis com foco em performance e experiência do usuário.",
    features: [
      "React & Next.js",
      "Tailwind CSS & animações",
      "Componentização e design system",
      "Otimização de performance",
      "Cross-browser e responsivo",
    ],
    featured: true, // card em destaque
  },
  {
    icon: faLayerGroup,
    title: "Desenvolvimento Full-Stack",
    description: "Do banco de dados à interface, entregando soluções completas e integradas.",
    features: [
      "Node.js & APIs REST",
      "Integração com banco de dados",
      "Autenticação e autorização",
      "Deploy e configuração",
    ],
  },
  {
    icon: faWordpress,
    title: "Sites WordPress / Wix / Shopify",
    description: "Sites profissionais em plataformas populares, personalizados para sua marca e fáceis de gerenciar.",
    features: [
      "Temas customizados",
      "Plugins e integrações",
      "E-commerce e catálogos",
      "Treinamento de uso",
    ],
  },
  {
    icon: faServer,
    title: "Manutenção e Hospedagem",
    description: "Seu site sempre no ar, seguro e atualizado — sem dor de cabeça técnica.",
    features: [
      "Configuração de servidores",
      "SSL e segurança",
      "Atualizações e backups",
      "Monitoramento de uptime",
    ],
  },
  {
    icon: faMobileScreen,
    title: "Aplicativos Web Personalizados",
    description: "Sistemas e ferramentas web sob medida para as necessidades reais do seu negócio.",
    features: [
      "Dashboards e painéis",
      "Sistemas de gestão",
      "Integrações com APIs",
      "Fluxos automatizados",
    ],
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
    }, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Fundo: grade tech ────────────────────────────────────────────────────────
function TechGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grade ortogonal */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="srv-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#srv-grid)" />
      </svg>

      {/* Diagonais lime */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="srv-diag" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 0 80 L 80 0" fill="none" stroke="#a3e635" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#srv-diag)" />
      </svg>

      {/* Pontos nos cruzamentos */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <defs>
          <pattern id="srv-dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.2" fill="#a3e635" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#srv-dots)" />
      </svg>

      {/* Linha separadora topo */}
      <div className="absolute top-0 inset-x-0 h-1
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
    </div>
  );
}

// ─── Card em destaque (Front-End) ─────────────────────────────────────────────
function FeaturedCard({ icon, title, description, features }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className={`relative col-span-1 lg:col-span-2 flex flex-col sm:flex-row gap-8
        p-8 rounded-2xl border border-lime-400/30
        bg-gradient-to-br from-lime-500/10 via-slate-900/80 to-slate-900/60
        backdrop-blur-sm shadow-xl shadow-lime-500/10
        hover:border-lime-400/50 hover:shadow-lime-500/20
        transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Badge destaque */}
      <div className="absolute -top-3 left-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
          bg-lime-500 text-slate-900 text-xs font-bold tracking-wide shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900/50" />
          Mais solicitado
        </span>
      </div>

      {/* Ícone + título + descrição */}
      <div className="flex-1 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-lime-500/15 border border-lime-400/30
          flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="w-7 h-7 text-lime-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Divisor vertical — só desktop */}
      <div className="hidden sm:block w-px bg-gradient-to-b
        from-transparent via-lime-500/20 to-transparent self-stretch" />

      {/* Lista de features */}
      <ul className="flex-1 space-y-3 self-center">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
            <span className="flex-shrink-0 w-5 h-5 rounded-full
              bg-lime-500/15 border border-lime-400/30
              flex items-center justify-center">
              <CheckIcon className="w-3 h-3 text-lime-400" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

// ─── Card padrão ──────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, description, features, index }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group flex flex-col p-6 rounded-2xl
        bg-slate-900/60 border border-slate-700/50 backdrop-blur-sm
        hover:border-lime-400/30 hover:bg-slate-900/80
        hover:-translate-y-1 hover:shadow-xl hover:shadow-lime-500/5
        transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Ícone */}
      <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60
        flex items-center justify-center mb-5 flex-shrink-0
        group-hover:bg-lime-500/10 group-hover:border-lime-400/30
        transition-all duration-300">
        <FontAwesomeIcon icon={icon} className="w-5 h-5 text-lime-400" />
      </div>

      {/* Título + descrição */}
      <h3 className="text-base font-bold text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        {description}
      </p>

      {/* Lista de entregas */}
      <ul className="mt-auto space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-xs text-slate-500
            group-hover:text-slate-400 transition-colors duration-300">
            <CheckIcon className="w-3.5 h-3.5 text-lime-400/70 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Barra decorativa */}
      <div className="mt-6 h-px w-0 bg-gradient-to-r from-lime-500 to-lime-400 rounded-full
        group-hover:w-full transition-all duration-500" aria-hidden="true" />
    </article>
  );
}

// ─── Cabeçalho ────────────────────────────────────────────────────────────────
function SectionHeader() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-10 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full" />
        <h2
          id="servicos-title"
          className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight"
        >
          O que posso <span className="text-lime-400">oferecer</span>
        </h2>
      </div>
      <p className="text-slate-400 text-base ml-4 pl-3 border-l border-slate-800">
        Serviços pensados para transformar suas ideias em produtos digitais reais.
      </p>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export default function ServicesSection() {
  const featured = SERVICES.find((s) => s.featured);
  const rest     = SERVICES.filter((s) => !s.featured);

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        py-20 sm:py-28 overflow-hidden"
    >
      <TechGridBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader />

        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Card destaque — ocupa 2 colunas no desktop */}
          {featured && <FeaturedCard {...featured} />}

          {/* Demais serviços */}
          {rest.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}