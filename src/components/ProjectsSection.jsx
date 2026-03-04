import { useState, useRef, useEffect } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

const PREV_ID = "projects-prev";
const NEXT_ID = "projects-next";
const PAGINATION_ID = "projects-pagination";

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

// ─── Fundo: grade tech (mesmo padrão da seção Skills) ────────────────────────
function TechGridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grade ortogonal */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="journey-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journey-grid)" />
      </svg>

      {/* Diagonais lime */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <defs>
          <pattern id="journey-diag" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 0 80 L 80 0" fill="none" stroke="#a3e635" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journey-diag)" />
      </svg>

      {/* Pontos nos cruzamentos */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="journey-dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.2" fill="#a3e635" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#journey-dots)" />
      </svg>

      {/* Glows */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[260px]
        bg-lime-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 right-0 w-72 h-72
        bg-lime-400/4 rounded-full blur-3xl" />

      {/* Linha separadora topo */}
      <div className="absolute top-0 inset-x-0 h-1
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
    </div>
  );
}

// ─── Botão de navegação ───────────────────────────────────────────────────────
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

// ─── Filtros ──────────────────────────────────────────────────────────────────
function FilterBar({ showFeatured, onChange, featuredCount }) {
  const filters = [
    { label: "Todos",     value: false, count: projects.length },
    { label: "Destaques", value: true,  count: featuredCount, icon: StarIcon },
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
export default function ProjectsSection() {
  const [showFeatured, setShowFeatured] = useState(false);
  const swiperRef = useRef(null);

  const header   = useInView({ threshold: 0.2 });
  const filters  = useInView({ threshold: 0.2 });
  const carousel = useInView({ threshold: 0.1 });

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
      <TechGridBackground />

      <style>{`
        .projects-swiper .swiper-button-next::after,
        .projects-swiper .swiper-button-prev::after { display: none; }
        .projects-swiper .swiper-pagination {
          position: static; display: flex; align-items: center;
          justify-content: center; gap: 6px; margin-top: 2rem;
        }
        .projects-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px; border-radius: 9999px;
          background: rgb(71 85 105); opacity: 1;
          margin: 0 !important; transition: all 0.3s ease;
        }
        .projects-swiper .swiper-pagination-bullet-active {
          background: #a3e635; width: 24px;
        }
        .projects-swiper .swiper-wrapper { padding-bottom: 8px; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
        <div
          ref={header.ref}
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10
            transition-all duration-700
            ${header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
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
          {hasMultiple && (
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pb-1">
              <NavButton id={PREV_ID} direction="prev" />
              <NavButton id={NEXT_ID} direction="next" />
            </div>
          )}
        </div>

        {/* ── Filtros ────────────────────────────────────────────────────── */}
        <div
          ref={filters.ref}
          style={{ transitionDelay: "100ms" }}
          className={`mb-8 transition-all duration-700
            ${filters.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <FilterBar
            showFeatured={showFeatured}
            onChange={handleFilterChange}
            featuredCount={featuredProjects.length}
          />
        </div>

        {/* ── Carousel ───────────────────────────────────────────────────── */}
        <div
          ref={carousel.ref}
          style={{ transitionDelay: "200ms" }}
          className={`transition-all duration-700
            ${carousel.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
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
        </div>

        {/* ── Rodapé ─────────────────────────────────────────────────────── */}
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