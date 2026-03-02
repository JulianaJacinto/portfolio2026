import { useEffect, useRef, useState, useMemo } from "react";
import {
  faHtml5, faCss3, faJs, faReact, faPython,
  faWordpress, faGitAlt, faTailwindCss, faElementor, faFigma,
  faOpenai, faClaude, faGithubAlt,
} from "@fortawesome/free-brands-svg-icons";
import { faMicrochip, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ─── Dados ────────────────────────────────────────────────────────────────────
const BASE_SKILLS = [
  { name: "HTML 5",     level: 95, icon: faHtml5,  description: "Estruturação semântica e acessível" },
  { name: "JavaScript", level: 90, icon: faJs,     description: "Interatividade e lógica" },
  { name: "React",      level: 85, icon: faReact,  description: "Componentes reutilizáveis" },
  { name: "CSS 3",      level: 75, icon: faCss3,   description: "Estilização e animações modernas" },
];

const OTHER_TECH = [
  { name: "Python",        icon: faPython },
  { name: "PHP",           icon: faMicrochip },
  { name: "Tailwind CSS",  icon: faTailwindCss },
  { name: "Git",           icon: faGitAlt },
  { name: "WordPress",     icon: faWordpress },
  { name: "Elementor",     icon: faElementor },
  { name: "Figma",         icon: faFigma },
  { name: "Arduino/ESP32", icon: faRobot },
  { name: "OpenAI",        icon: faOpenai },
  { name: "Claude",        icon: faClaude },
  { name: "GitHub Copilot",icon: faGithubAlt },
];

// ─── Hook: dispara quando o elemento entra na viewport ───────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // anima só uma vez
      }
    }, { threshold: 0.2, ...options });

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

// ─── Progresso circular animado ───────────────────────────────────────────────
function CircularProgress({ level, animate }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = animate
    ? circumference - (level / 100) * circumference
    : circumference; // começa "vazio"

  return (
    <svg
      className="w-24 h-24 -rotate-90"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/* Trilha */}
      <circle
        cx="50" cy="50" r={radius}
        fill="none" stroke="currentColor"
        strokeWidth="4"
        className="text-slate-700"
      />
      {/* Progresso */}
      <circle
        cx="50" cy="50" r={radius}
        fill="none" stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-lime-400"
        style={{
          transition: animate
            ? `stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        }}
      />
    </svg>
  );
}

// ─── Card de skill principal ──────────────────────────────────────────────────
function SkillCard({ name, level, icon, description, animationDelay = 0 }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      aria-label={`${name} – ${level}%`}
      style={{ transitionDelay: `${animationDelay}ms` }}
      className={`group relative flex flex-col items-center text-center p-8 rounded-2xl
        bg-gradient-to-br from-slate-800/60 to-slate-900/60
        backdrop-blur-md border border-lime-400/15
        hover:border-lime-400/40 hover:shadow-2xl hover:shadow-lime-500/15
        hover:-translate-y-2
        transition-all duration-500
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* Ícone */}
      <div className="mb-5 p-3 rounded-xl bg-slate-900/60 border border-lime-400/10
        group-hover:border-lime-400/30 group-hover:bg-lime-500/5 transition-all duration-300">
        <FontAwesomeIcon
          icon={icon}
          className="w-9 h-9 text-lime-400 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        />
      </div>

      {/* Nome */}
      <h3 className="text-lg font-bold text-slate-100 mb-4
        group-hover:text-lime-300 transition-colors duration-300">
        {name}
      </h3>

      {/* Circular progress */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        <CircularProgress level={level} animate={inView} />
        <span className="absolute text-xl font-bold text-lime-400">
          {level}%
        </span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-slate-400 leading-relaxed
        group-hover:text-slate-300 transition-colors duration-300">
        {description}
      </p>

      {/* Barra decorativa no hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0
          bg-gradient-to-r from-lime-500 to-lime-400 rounded-full
          group-hover:w-3/4 transition-all duration-500"
        aria-hidden="true"
      />
    </article>
  );
}

// ─── Card de tecnologia secundária ────────────────────────────────────────────
function TechCard({ name, icon, animationDelay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${animationDelay}ms` }}
      className={`flex items-center gap-3 p-4 rounded-xl
        bg-slate-900/70 border border-slate-700/50
        group cursor-default
        transition-all duration-300
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="w-6 h-6 text-lime-400/80 flex-shrink-0
            group-hover:text-lime-400 group-hover:scale-110 transition-all duration-300"
          aria-hidden="true"
        />
      )}
      <span className="text-sm font-medium text-slate-400
        group-hover:text-slate-200 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

// ─── Cabeçalho da seção ───────────────────────────────────────────────────────
function SectionHeader() {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <h2
        id="habilidades-title"
        className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight"
      >
        Minhas <span className="text-lime-400">Habilidades</span>
      </h2>
      <div className="flex justify-center mb-5">
        <div className="h-1 w-24 bg-lime-400 rounded-full" />
      </div>
      <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Aqui estão minhas principais habilidades e tecnologias — além de outras
        que tenho experiência e estou sempre aprimorando!
      </p>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export default function SkillSection() {
  const skills = useMemo(() => BASE_SKILLS, []);
  const other  = useMemo(() => OTHER_TECH,  []);

  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-28 overflow-hidden"
    >
      <TechGridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        <SectionHeader />

        {/* ── Skills principais ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              {...skill}
              animationDelay={i * 100}
            />
          ))}
        </div>

        {/* ── Divisor com label ─────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700" />
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest px-2">
            Outras tecnologias & ferramentas
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700" />
        </div>

        {/* ── Tecnologias secundárias ───────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {other.map((tech, i) => (
            <TechCard
              key={tech.name}
              {...tech}
              animationDelay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}