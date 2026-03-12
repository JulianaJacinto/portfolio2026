import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCode,
  faBriefcase,
  faSatellite,
} from "@fortawesome/free-solid-svg-icons";
import { faWordpress } from "@fortawesome/free-brands-svg-icons";

const JOURNEY = [
  {
    year: "2019 - 2021",
    icon: faCode,
    title: "Primeiro contato com programação",
    subtitle: "Ensino Médio Técnico",
    description:
      "Durante o ensino médio integrado, tive meu primeiro contato com lógica de programação e desenvolvimento de sistemas. Foi nesse período que despertei meu interesse pela área de tecnologia, iniciando uma trajetória de aprendizado contínuo e aprofundamento técnico.",
    tags: ["Lógica de Programação", "Base Técnica", "Início da Jornada"],
  },
  {
    year: "2022 - atual",
    icon: faGraduationCap,
    title: "Graduação em Análise e Desenvolvimento de Sistemas",
    subtitle: "FATEC Cruzeiro-SP",
    description:
      "Iniciei a graduação em Análise e Desenvolvimento de Sistemas, consolidando fundamentos em estruturas de dados, redes, engenharia de software e desenvolvimento web. A formação acadêmica ampliou minha visão técnica e me preparou para atuar em projetos reais com maior maturidade profissional.",
    tags: ["ADS", "Algoritmos", "Redes", "Engenharia de Software"],
  },
  {
    year: "2024",
    icon: faWordpress,
    title: "Estágio em Desenvolvimento Web",
    subtitle: "Pineapple TI",
    description:
      "Atuei como estagiária em desenvolvimento web, participando da criação e manutenção de sites institucionais e e-commerces para clientes locais. Trabalhei com WordPress, personalização de layouts, integração de ferramentas e colaboração em projetos internos de sistemas personalizados, adquirindo experiência prática em ambiente profissional.",
    tags: ["WordPress", "Desenvolvimento Web", "Ambiente Corporativo"],
  },
  {
    year: "2025",
    icon: faBriefcase,
    title: "Projeto Freelance",
    subtitle: "E-commerce para comércio local",
    description:
      "Desenvolvi de forma independente um site institucional com loja virtual para uma marca local de vestuário. Fui responsável por todo o processo: planejamento, desenvolvimento em WordPress, configuração de pagamentos e otimização da experiência do usuário. O projeto proporcionou vivência em gestão de clientes, autonomia técnica e entrega ponta a ponta.",
    tags: ["Freelance", "E-commerce", "Gestão de Projeto", "UX/UI"],
  },
  {
    year: "2025 - atual",
    icon: faSatellite,
    title: "Bolsista no INPE",
    subtitle: "Projeto Educação – Instituto Nacional de Pesquisas Espaciais",
    description:
      "Integro o Projeto Educação do INPE como bolsista, atuando no desenvolvimento de uma estação meteorológica de baixo custo para fins educacionais. O projeto envolve sensores, microcontroladores e coleta de dados ambientais, com foco em acessibilidade tecnológica e incentivo à educação científica. A experiência tem ampliado minha atuação para áreas como IoT, eletrônica aplicada e análise de dados ambientais.",
    tags: ["INPE", "IoT", "Pesquisa", "Educação Científica"],
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

// ─── Fundo: grade de linhas estilo tech ──────────────────────────────────────
function TechGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Grade SVG horizontal + vertical */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>

      {/* Linhas diagonais de acento */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <defs>
          <pattern id="tech-diag" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 0 80 L 80 0" fill="none" stroke="#a3e635" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-diag)" />
      </svg>

      {/* Ponto nos cruzamentos da grade */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="tech-dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.2" fill="#a3e635" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-dots)" />
      </svg>

      {/* Glow de acento — topo centro */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px]
        bg-lime-500/6 rounded-full blur-3xl" />

      {/* Glow secundário — canto inferior direito */}
      <div className="absolute -bottom-16 -right-16 w-72 h-72
        bg-lime-400/5 rounded-full blur-3xl" />

      {/* Linha de separação topo */}
      <div className="absolute top-0 inset-x-0 h-1
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
    </div>
  );
}

// ─── Card individual ──────────────────────────────────────────────────────────
function JourneyCard({ year, icon, title, subtitle, description, tags, index }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group relative flex flex-col p-6 rounded-2xl
        bg-slate-900/60 border border-slate-700/50
        hover:border-lime-400/30 hover:bg-slate-900/80
        hover:shadow-xl hover:shadow-lime-500/5
        hover:-translate-y-1
        backdrop-blur-sm transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Topo: ícone + ano */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl bg-lime-500/10 border border-lime-400/20
          flex items-center justify-center flex-shrink-0
          group-hover:bg-lime-500/15 group-hover:border-lime-400/40
          transition-all duration-300">
          <FontAwesomeIcon icon={icon} className="w-5 h-5 text-lime-400" />
        </div>

        <span className="text-xs font-bold text-lime-400/70 bg-lime-500/10
          border border-lime-400/15 px-2.5 py-1 rounded-full tracking-wider">
          {year}
        </span>
      </div>

      {/* Título + subtítulo */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-slate-100 leading-snug mb-1">
          {title}
        </h3>
        <p className="text-xs text-lime-400/60 font-semibold uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      {/* Descrição */}
      <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full
              bg-slate-800/80 border border-slate-700/40
              text-slate-500 group-hover:text-slate-400
              transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Barra decorativa bottom no hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0
        bg-gradient-to-r from-lime-500 to-lime-400 rounded-full
        group-hover:w-2/3 transition-all duration-500" aria-hidden="true" />
    </article>
  );
}

// ─── Cabeçalho da seção ───────────────────────────────────────────────────────
function SectionHeader() {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-10 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full" />
        <h2
          id="jornada-title"
          className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight"
        >
          Minha <span className="text-lime-400">Jornada</span>
        </h2>
      </div>
      <p className="text-slate-400 text-base ml-4 pl-3 border-l border-slate-800">
        As fases e experiências que me trouxeram até aqui.
      </p>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export default function JourneySection() {
  return (
    <section
      id="jornada"
      aria-labelledby="jornada-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        py-20 sm:py-28 overflow-hidden"
    >
      <TechGridBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader />

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {JOURNEY.map((item, i) => (
            <JourneyCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}