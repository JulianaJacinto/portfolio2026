import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

// ─── Scroll suave (mesmo padrão do resto do projeto) ─────────────────────────
const HEADER_OFFSET = 80;
function scrollToSection(href) {
  const el = document.getElementById(href.replace("#", ""));
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: "smooth",
  });
}

// ─── Partículas flutuantes decorativas ───────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 1 + Math.random() * 2.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-lime-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `particle404 ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Número 404 gigante em SVG com efeito glitch ──────────────────────────────
function GlitchNumber() {
  return (
    <div className="relative select-none" aria-hidden="true">
      <span
        className="absolute inset-0 text-[clamp(5rem,18vw,12rem)] font-black
          text-cyan-400/20 tracking-tighter leading-none"
        style={{ animation: "glitchA 3.5s infinite", clipPath: "inset(30% 0 40% 0)" }}
      >
        404
      </span>

      {/* Camada de sombra glitch — lime */}
      <span
        className="absolute inset-0 text-[clamp(5rem,18vw,12rem)] font-black
          text-lime-400/15 tracking-tighter leading-none"
        style={{ animation: "glitchB 3.5s infinite", clipPath: "inset(60% 0 10% 0)" }}
      >
        404
      </span>

      {/* Número principal */}
      <span
        className="relative text-[clamp(5rem,18vw,12rem)] font-black tracking-tighter
          leading-none bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600
          bg-clip-text text-transparent"
      >
        404
      </span>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function NotFoundPage() {
  return (
    <>
      <style>{`
        @keyframes particle404 {
          0%, 100% { transform: translateY(0) scale(1); opacity: inherit; }
          50%       { transform: translateY(-24px) scale(1.4); }
        }

        @keyframes glitchA {
          0%, 90%, 100% { transform: translate(0, 0); opacity: 0; }
          92%            { transform: translate(-4px, -2px); opacity: 1; }
          94%            { transform: translate(4px, 2px); opacity: 0.8; }
          96%            { transform: translate(-2px, 0); opacity: 1; }
        }

        @keyframes glitchB {
          0%, 88%, 100% { transform: translate(0, 0); opacity: 0; }
          90%            { transform: translate(6px, 2px); opacity: 1; }
          93%            { transform: translate(-4px, -2px); opacity: 0.6; }
          96%            { transform: translate(2px, 0); opacity: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      <div className="relative min-h-[700px] flex items-center justify-center
        bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
        overflow-hidden px-6">

        {/* Grade tech — mesma da seção Skills / Jornada */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="grid-404" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-404)" />
          </svg>

          {/* Pontos nos cruzamentos */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
            <defs>
              <pattern id="dots-404" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1.2" fill="#a3e635" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-404)" />
          </svg>

          {/* Scanline sutil */}
          <div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r
              from-transparent via-lime-400/8 to-transparent pointer-events-none"
            style={{ animation: "scanline 8s linear infinite" }}
          />
        </div>

        {/* Partículas */}
        <Particles />

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">

          {/* Número glitch */}
          <div style={{ animation: "fadeUp 0.6s ease-out 0.1s both" }}>
            <GlitchNumber />
          </div>

          {/* Linha decorativa */}
          <div
            className="w-24 h-px bg-lime-400/60 mt-2 mb-8"
            style={{ animation: "fadeUp 0.6s ease-out 0.2s both" }}
          />

          {/* Título */}
          <h1
            className="text-2xl md:text-3xl font-bold text-slate-100 mb-3"
            style={{ animation: "fadeUp 0.6s ease-out 0.3s both" }}
          >
            Página não encontrada
          </h1>

          {/* Descrição */}
          <p
            className="text-slate-400 leading-relaxed mb-10 text-sm md:text-base"
            style={{ animation: "fadeUp 0.6s ease-out 0.4s both" }}
          >
            Parece que esta página se perdeu no espaço, assim como alguns commits
            no histórico do Git.<br />
            Não se preocupe, o restante do portfólio está intacto.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            style={{ animation: "fadeUp 0.6s ease-out 0.5s both" }}
          >
            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                px-8 py-3 rounded-full bg-lime-500
                text-slate-900 font-semibold text-sm
                shadow-lg shadow-lime-600/30 hover:shadow-lime-500/40
                hover:scale-105 transition-all duration-300"
            >
              <HomeIcon className="w-5 h-5" />
              Ir para o início
            </a>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                px-8 py-3 rounded-full border border-slate-700 text-slate-400
                hover:border-lime-400/50 hover:text-lime-400 hover:bg-lime-500/5
                font-semibold text-sm hover:scale-105 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}