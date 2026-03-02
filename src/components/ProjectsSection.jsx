import { useState, useRef } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

// ─── IDs dos controles (evita conflito se houver múltiplos Swipers na página) ─
const PREV_ID = "projects-prev";
const NEXT_ID = "projects-next";
const PAGINATION_ID = "projects-pagination";

// ─── Fundo: geométrico ─────────────
function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Círculo grande — canto inferior direito */}
      <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full
        border border-lime-500/10 bg-gradient-to-tl from-lime-500/5 to-transparent" />
      <div className="absolute -bottom-20 -right-20 w-[380px] h-[380px] rounded-full
        border border-lime-400/8" />

      {/* Círculo menor — canto superior esquerdo */}
      <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full
        border border-lime-500/8 bg-gradient-to-br from-lime-500/4 to-transparent" />

      {/* Hexágono SVG — esquerda, meio */}
      <svg className="absolute left-10 top-1/2 -translate-y-1/2 w-36 h-36 opacity-[0.05]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none" stroke="#a3e635" strokeWidth="1.5" />
      </svg>

      {/* Hexágono menor — direita, topo */}
      <svg className="absolute right-16 top-16 w-20 h-20 opacity-[0.05]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none" stroke="#a3e635" strokeWidth="2" />
      </svg>

      {/* Grid de pontos */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="proj-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#proj-dots)" />
      </svg>

      {/* Glow central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[300px] bg-lime-500/4 rounded-full blur-3xl" />

      {/* Linha separadora topo */}
      <div className="absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-lime-500/25 to-transparent" />
    </div>
  );
}

// ─── Botão de navegação customizado ──────────────────────────────────────────
function NavButton({ id, direction }) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      id={id}
      aria-label={direction === "prev" ? "Projeto anterior" : "Próximo projeto"}
      className="flex items-center justify-center w-11 h-11 rounded-xl
        bg-slate-800/80 border border-slate-700/60 text-slate-400
        hover:bg-slate-700 hover:border-lime-400/50 hover:text-lime-400
        disabled:opacity-30 disabled:cursor-not-allowed
        transition-all duration-200 backdrop-blur-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/50"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

// ─── Filtros com contadores ───────────────────────────────────────────────────
function FilterBar({ showFeatured, onChange, featuredCount }) {
  const filters = [
    { label: "Todos", value: false, count: projects.length },
    { label: "Destaques", value: true, count: featuredCount, icon: StarIcon },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {filters.map(({ label, value, count, icon: Icon }) => {
        const active = showFeatured === value;
        return (
          <button
            key={label}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
              border transition-all duration-200
              ${active
                ? "bg-lime-500 border-lime-500 text-slate-900 hover:bg-lime-600 hover:border-lime-600"
                : "border-slate-700 text-slate-400 bg-transparent hover:border-slate-500 hover:text-slate-300"
              }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium
              ${active ? "bg-slate-900/30 text-slate-800" : "bg-slate-800 text-slate-500"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ProjectsCarousel() {
  const [showFeatured, setShowFeatured] = useState(false);
  const swiperRef = useRef(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const activeList = showFeatured ? featuredProjects : projects;
  const hasMultiple = activeList.length > 1;

  const handleFilterChange = (featured) => {
    setShowFeatured(featured);
    swiperRef.current?.slideTo(0);
  };

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-28 overflow-hidden"
    >
      <DecorativeBackground />

      {/* Swiper custom styles */}
      <style>{`
        /* Remove setas padrão */
        .projects-swiper .swiper-button-next::after,
        .projects-swiper .swiper-button-prev::after { display: none; }

        /* Bullets customizados */
        .projects-swiper .swiper-pagination {
          position: static;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 2rem;
        }
        .projects-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgb(71 85 105);
          opacity: 1;
          margin: 0 !important;
          transition: all 0.3s ease;
        }
        .projects-swiper .swiper-pagination-bullet-active {
          background: #a3e635;
          width: 24px;
        }

        /* Sombra dos cards não corta */
        .projects-swiper .swiper-wrapper {
          padding-bottom: 8px;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-10 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full" />
              <h2
                id="projetos-title"
                className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight"
              >
                Projetos <span className="text-lime-400">Desenvolvidos</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg ml-4 pl-3 border-l border-slate-800">
              Explore meus projetos acadêmicos e profissionais.
            </p>
          </div>

          {/* Botões de nav — visíveis só em desktop, ao lado do título */}
          {hasMultiple && (
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pb-1">
              <NavButton id={PREV_ID} direction="prev" />
              <NavButton id={NEXT_ID} direction="next" />
            </div>
          )}
        </div>

        {/* ── Filtros ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <FilterBar
            showFeatured={showFeatured}
            onChange={handleFilterChange}
            featuredCount={featuredProjects.length}
          />
        </div>

        {/* ── Swiper / empty state ───────────────────────────────────────── */}
        {activeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3
            text-slate-600 border border-slate-800 rounded-2xl bg-slate-900/30">
            <StarIcon className="w-10 h-10 opacity-30" />
            <p className="text-sm">Nenhum projeto em destaque ainda.</p>
          </div>
        ) : (
          <Swiper
            className="projects-swiper"
            modules={[Navigation, Pagination, Keyboard, A11y]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={24}
            navigation={{ prevEl: `#${PREV_ID}`, nextEl: `#${NEXT_ID}` }}
            pagination={{ el: `#${PAGINATION_ID}`, clickable: true }}
            keyboard={{ enabled: true }}
            loop={activeList.length > 3}
            grabCursor
            breakpoints={{
              0:    { slidesPerView: 1 },
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {activeList.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ── Rodapé: nav mobile + paginação ────────────────────────────── */}
        <div className="flex items-center justify-between mt-2 min-h-[3rem]">
          {hasMultiple && (
            <div className="flex sm:hidden items-center gap-2">
              <NavButton id={`${PREV_ID}-m`} direction="prev" />
              <NavButton id={`${NEXT_ID}-m`} direction="next" />
            </div>
          )}
          <div id={PAGINATION_ID} className="flex-1" />
        </div>
      </div>
    </section>
  );
}