import { useEffect, useRef, useState } from "react";
import { PhoneIcon, ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram, faReact, faCss3, faJs, faWhatsapp,} from "@fortawesome/free-brands-svg-icons";

// ─── Constante de offset ────────────────────────
const HEADER_OFFSET = 80;

function scrollToSection(href) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: "smooth",
  });
}

// ─── Typewriter otimizado com useRef ───────
function useTypewriter(text, speed = 40) {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    const tick = () => {
      if (indexRef.current < text.length) {
        indexRef.current += 1;
        setDisplayedText(text.slice(0, indexRef.current));
        timeoutId = setTimeout(tick, speed);
      }
    };

    let timeoutId = setTimeout(tick, speed);
    return () => clearTimeout(timeoutId);
  }, [text, speed]);

  const isComplete = displayedText.length === text.length;
  return { displayedText, isComplete };
}

// ─── Ícone flutuante ──────────────────────────────────────────────────────────
function FloatingIcon({ icon, position, delay }) {
  return (
    <div
      className={`absolute w-14 h-14 flex items-center justify-center rounded-full
        bg-slate-800/70 border border-lime-400/30 backdrop-blur-sm shadow-lg shadow-lime-500/20
        transition-all duration-300 ${position}`}
      style={{ animation: `heroFloat 6s ease-in-out ${delay}s infinite` }}
    >
      {icon}
    </div>
  );
}

// ─── Imagem de perfil com fallback correto ───────────────────────────────────
function ProfileImage() {
  const [status, setStatus] = useState("loading"); // "loading" | "loaded" | "error"

  return (
    <div className="relative w-96 h-96 md:w-[420px] md:h-[420px] ">

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-500/30 to-emerald-500/20 blur-2xl scale-110" />

      <div className="absolute inset-1 rounded-full border border-lime-500/20 z-20 pointer-events-none" />

      {/* Container da imagem */}
      <div className="relative w-full h-full rounded-full overflow-hidden z-10 bg-slate-800">
        {/* Skeleton enquanto carrega */}
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-slate-700" />
          </div>
        )}

        {/* Fallback — só aparece se a imagem falhar */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 gap-2">
            <span className="text-xs text-slate-500 font-mono">foto de perfil</span>
          </div>
        )}

        <img
          src="/julianajacinto.github.io/images/foto de perfil.jpeg"
          alt="Juliana Jacinto"
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

// ─── Elemento visual lateral ─────────────────────────────────────────────────
function ProfileVisual() {
  return (
    <div className="relative w-full flex justify-center items-center mt-12 md:mt-0 md:h-96">
      {/* Ícones flutuantes — só desktop */}
      <div className="hidden lg:block">
        <FloatingIcon
          icon={<FontAwesomeIcon icon={faReact} className="w-7 h-7 text-lime-400" />}
          position="top-4 left-14"
          delay={0}
        />
        <FloatingIcon
          icon={<FontAwesomeIcon icon={faJs} className="w-7 h-7 text-lime-400" />}
          position="top-24 right-12"
          delay={0.5}
        />
        <FloatingIcon
          icon={<FontAwesomeIcon icon={faCss3} className="w-7 h-7 text-lime-400" />}
          position="bottom-0 left-12"
          delay={1}
        />
      </div>

      <ProfileImage />
    </div>
  );
}

// ─── Badge de status ──────────────────────────────────────────────────────────
function AvailableBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-sm font-medium mb-4">
      <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
      Disponível para projetos
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const fullText = "Desenvolvedora Web | Front-End | React & Tailwind";
  const { displayedText, isComplete } = useTypewriter(fullText, 35);

  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="inicio"
        className="relative min-h-[720px] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-lime-900 px-6 py-16 overflow-hidden pt-24 md:pt-32"
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

        {/* Grid principal */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Coluna de texto ───────────────────────────────────────────── */}
          <div className="space-y-4 md:space-y-5">

            {/* Badge */}
            <div style={{ animation: "heroFadeUp 0.6s ease-out 0.1s both" }}>
              <AvailableBadge />
            </div>

            {/* Nome */}
            <div style={{ animation: "heroFadeUp 0.6s ease-out 0.2s both" }}>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
                  Juliana Jacinto
                </span>
              </h1>
            </div>

            {/* Typewriter */}
            <div
              className="min-h-[2rem] md:min-h-[2.5rem]"
              style={{ animation: "heroFadeUp 0.6s ease-out 0.3s both" }}
            >
              <h2 className="text-base sm:text-lg md:text-xl text-slate-200 font-semibold">
                {displayedText}
                <span
                  className={`ml-0.5 text-lime-400 ${
                    isComplete ? "animate-pulse" : ""
                  }`}
                >
                  |
                </span>
              </h2>
            </div>

            {/* Descrição */}
            <p
              className="text-slate-400 leading-relaxed max-w-lg"
              style={{ animation: "heroFadeUp 0.6s ease-out 0.4s both" }}
            >
              Combinando criatividade e lógica para desenvolver interfaces modernas,
              funcionais e alinhadas com objetivos reais de negócio.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              style={{ animation: "heroFadeUp 0.6s ease-out 0.5s both" }}
            >
              <a
                href="/julianajacinto.github.io/doc/JulianaJacinto_curriculo.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3
                  bg-lime-500 text-slate-900 hover:bg-lime-400
                  font-semibold rounded-full shadow-lg shadow-lime-600/20
                  hover:shadow-lime-600/30 hover:scale-105
                  transition-all duration-300"
              >
                Baixar Currículo
                <ArrowDownOnSquareIcon className="h-4 w-4" />
              </a>

              <button
                onClick={() => scrollToSection("#contato")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3
                  bg-slate-900 border border-lime-500 text-lime-400
                  hover:bg-slate-900/70 hover:border-lime-400
                  font-semibold rounded-full shadow-lg
                  hover:scale-105 transition-all duration-300"
              >
                Entre em contato
                <PhoneIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Redes sociais */}
            <div
              className="pt-4 border-t border-lime-800"
              style={{ animation: "heroFadeUp 0.6s ease-out 0.6s both" }}
            >
              <div className="flex gap-2">
                {[
                  { icon: faGithub, href: "https://github.com/julianajacinto", label: "GitHub" },
                  { icon: faLinkedin, href: "https://www.linkedin.com/in/juliana-jacinto/", label: "LinkedIn" },
                  { icon: faWhatsapp, href: "https://wa.me/5511966403523", label: "WhatsApp" },
                  { icon: faInstagram, href: "https://www.instagram.com/jukka.arts/", label: "Instagram" },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl text-slate-400
                      hover:text-lime-400 hover:bg-slate-800/60 hover:scale-110
                      transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={icon} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Coluna visual ─────────────────────────────────────────────── */}
          <div style={{ animation: "heroFadeUp 0.8s ease-out 0.3s both" }}>
            <ProfileVisual />
          </div>
        </div>

        {/* Indicador de scroll */}
        <button
          onClick={() => scrollToSection("#sobre")}
          aria-label="Ir para a próxima seção"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
            text-lime-400/60 hover:text-lime-400 transition-colors duration-300 animate-bounce"
        >
          <ChevronDownIcon className="w-7 h-7" />
        </button>
      </section>

      {/* Divisor */}
      <section className="h-2 bg-lime-500" />
    </>
  );
}