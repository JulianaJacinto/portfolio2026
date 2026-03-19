import { useMemo } from "react";
import { BoltIcon, PuzzlePieceIcon, PhoneIcon, CodeBracketIcon  } from "@heroicons/react/24/solid";

// ─── Scroll suave com offset ────────────────────────
const HEADER_OFFSET = 80;
function scrollToSection(href) {
  const el = document.getElementById(href.replace("#", ""));
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
    behavior: "smooth",
  });
}

// ─── Skills ──────────────────────────────────────────────────────────────────
const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Node.js",
  "UX/UI", "WordPress", "Python", "IoT",
];

function SkillTag({ children }) {
  return (
    <span
      className="px-4 py-1.5 bg-slate-800/80 border border-lime-400/20
        text-lime-100 rounded-full text-sm font-medium
        hover:bg-lime-500/10 hover:border-lime-400/50 hover:text-lime-300
        transition-all duration-200 cursor-default select-none"
    >
      {children}
    </span>
  );
}

// ─── Fundo decorativo: círculos + hexágonos ──────────────────────
function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Círculo grande — canto superior direito */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full
        border border-lime-500/10 bg-gradient-to-br from-lime-500/5 to-transparent" />
      <div className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full
        border border-lime-400/8" />

      {/* Círculo médio — canto inferior esquerdo */}
      <div className="absolute -bottom-40 -left-24 w-[400px] h-[400px] rounded-full
        border border-lime-500/10 bg-gradient-to-tr from-lime-500/5 to-transparent" />

      {/* Hexágono SVG — centro-direita */}
      <svg className="absolute right-8 top-1/3 w-40 h-40 opacity-[0.06]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none" stroke="#a3e635" strokeWidth="1.5" />
      </svg>

      {/* Hexágono menor — esquerda */}
      <svg className="absolute left-6 top-1/4 w-20 h-20 opacity-[0.06]" viewBox="0 0 100 100">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none" stroke="#a3e635" strokeWidth="2" />
      </svg>

      {/* Grid de pontos sutil */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="about-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-dots)" />
      </svg>

      {/* Glow de acento lime */}
      <div className="absolute top-0 right-1/4 w-72 h-72
        bg-lime-500/5 rounded-full blur-3xl" />
    </div>
  );
}

// ─── Imagem com placeholder e estado de erro ─────────────────────────────────
function ProfileImageCard() {
  return (
    <div className="relative group h-full min-h-[360px]">
      {/* Card */}
      <div className="relative h-full rounded-2xl overflow-hidden
        border border-lime-400/15 shadow-xl shadow-black/30">

        {/* Placeholder elegante enquanto a imagem não está disponível */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-800 to-slate-900">
          <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
            foto em breve
          </span>
        </div>

        {/* Imagem real — quando disponível sobe sobre o placeholder */}
        <img
          src="/images/placeholder.jpg"
          alt="Foto de Juliana Jacinto"
          className="relative z-10 w-full h-full object-cover opacity-0 transition-opacity duration-500"
          onLoad={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
        />
      </div>

      {/* Badge flutuante */}
      <div className="absolute -bottom-4 -right-4 z-30
        flex items-center gap-2 px-4 py-2 rounded-xl
        bg-slate-900 border border-lime-500/30
        shadow-lg shadow-black/40 text-sm font-semibold text-lime-400">
        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
        Desenvolvedora Front-End
      </div>
    </div>
  );
}

// ─── Seção principal ──────────────────────────────────────────────────────────
export default function AboutSection() {
  const skills = useMemo(() => SKILLS, []);

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-16 sm:py-18 overflow-hidden"
    >
      <DecorativeBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Cabeçalho da seção ──────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-10 bg-lime-600 rounded-full" aria-hidden="true" />
            <h2
              id="sobre-title"
              className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight"
            >
              Sobre <span className="text-lime-400">Mim</span>
            </h2>
          </div>
          <p className="text-slate-400 text-base ml-4 pl-3 border-l border-slate-800">
            Conheça um pouco mais sobre mim e da minha trajetória profissional!
          </p>
        </div>

        {/* ── Grid principal ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Coluna: imagem */}
          <ProfileImageCard />

          {/* Coluna: conteúdo */}
          <div className="flex flex-col justify-center space-y-6">

            {/* Texto biográfico */}
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Olá! Sou a{" "}
                <strong className="text-lime-300 font-semibold">Juliana Jacinto</strong> —
                ou <em className="text-lime-400">Jukka</em> para os íntimos — uma
                desenvolvedora Front-End focada em criar experiências digitais
                envolventes, funcionais e bem estruturadas.
              </p>
              <p>
                Atualmente curso{" "}
                <strong className="text-lime-300 font-semibold">
                  Análise e Desenvolvimento de Sistemas
                </strong>{" "}
                na FATEC de Cruzeiro-SP e atuo como{" "}
                <strong className="text-lime-300 font-semibold">bolsista no INPE</strong>{" "}
                (Instituto Nacional de Pesquisas Espaciais), integrando o Projeto
                Educação em parceria com universidades e instituições.
              </p>
              <p>
                Minha jornada com programação começou há mais de 8 anos, explorando
                desde <strong className="text-lime-300 font-semibold">Python</strong> e
                projetos com{" "}
                <strong className="text-lime-300 font-semibold">IoT</strong> (Arduino e
                ESP32) até o desenvolvimento web moderno. Hoje concentro meu trabalho em{" "}
                <strong className="text-lime-300 font-semibold">
                  React e Next.js
                </strong>
                , com foco em interfaces bem estruturadas e performáticas.
              </p>
              <p>
                Valorizo{" "}
                <strong className="text-lime-300 font-semibold">código limpo</strong>,
                projetos organizados e atenção em{" "}
                <strong className="text-lime-300 font-semibold">UX/UI</strong> — unindo
                lógica, estética e eficiência para criar soluções que realmente fazem
                sentido.
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
                Tecnologias & áreas
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="h-px bg-gradient-to-r from-lime-500/30 via-lime-400/20 to-transparent" />

            {/* CTAs com scroll suave */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => scrollToSection("#habilidades")}
                className="inline-flex items-center gap-2 px-8 py-3
                  bg-lime-500 text-slate-900 hover:bg-lime-400
                  font-semibold rounded-full shadow-lg shadow-lime-600/20
                  hover:shadow-lime-500/30 hover:scale-105
                  transition-all duration-300"
              >
                Ver Habilidades
                <BoltIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#projetos")}
                className="inline-flex items-center gap-2 px-8 py-3
                  bg-transparent border border-lime-500 text-lime-400
                  hover:bg-lime-500/10 hover:border-lime-400
                  font-semibold rounded-full shadow-lg
                  hover:scale-105 transition-all duration-300"
              >
                Ver Projetos
                <PuzzlePieceIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#servicos")}
                className="inline-flex items-center gap-2 px-8 py-3
                  bg-transparent border border-lime-500 text-lime-400
                  hover:bg-lime-500/10 hover:border-lime-400
                  font-semibold rounded-full shadow-lg
                  hover:scale-105 transition-all duration-300"
              >
                O que posso oferecer?
                <CodeBracketIcon  className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#contato")}
                className="inline-flex items-center gap-2 px-8 py-3
                  bg-lime-500 text-slate-900 hover:bg-lime-400
                  font-semibold rounded-full shadow-lg shadow-lime-600/20
                  hover:shadow-lime-500/30 hover:scale-105
                  transition-all duration-300"
              >
                Entre em contato
                <PhoneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}