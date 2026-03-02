import { useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// ─── Tag de categoria ─────────────────────────────────────────────────────────
function CategoryBadge({ label }) {
  return (
    <span
      className="px-2.5 py-0.5 text-xs font-medium rounded-full
      bg-slate-800 border border-slate-700 text-slate-400"
    >
      {label}
    </span>
  );
}

// ─── Tag de tecnologia ────────────────────────────────────────────────────────
function TechTag({ label }) {
  return (
    <span
      className="px-2.5 py-1 text-xs font-medium rounded-full
      bg-lime-500/10 border border-lime-400/20 text-lime-300"
    >
      {label}
    </span>
  );
}

// ─── Badge de progresso (usa o campo `progress` do objeto) ───────────────────
function ProgressBadge({ status }) {
  const styles = {
    "Em andamento": "bg-yellow-500/10 border-yellow-400/20 text-yellow-300",
    Concluído: "bg-green-500/10 border-green-400/20 text-green-300",
    Incompleto: "bg-red-500/10 border-red-400/20 text-red-300",
  };
  const classNames =
    styles[status] || "bg-slate-500/10 border-slate-400/20 text-slate-300";

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${classNames}`}>
      {status}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export default function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);

  const githubUrl = project.links?.github || null;
  const liveUrl = project.links?.live || null;
  const hasLinks = githubUrl || liveUrl;

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden
        bg-slate-900/80 border border-slate-700/60
        hover:border-lime-400/30 hover:shadow-2xl hover:shadow-lime-500/10
        hover:-translate-y-1 transition-all duration-400 h-[620px]"
      aria-label={project.name}
    >
      {/* badge “destaque” */}
      {project.featured && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1
          bg-yellow-600/80 text-yellow-100 text-xs font-medium px-2 py-0.5 rounded-full
          pointer-events-none"
        >
          <StarIcon className="w-4 h-4" />
          Destaque
        </div>
      )}

      {/* ── Imagem / Preview ──────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-800 shrink-0">
        {!imgError && project.image ? (
          <>
            <img
              src={project.image}
              alt={`Screenshot de ${project.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
            <div
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm
              opacity-0 group-hover:opacity-100 transition-all duration-300
              flex items-center justify-center gap-3"
            >
              <ImageLinks githubUrl={githubUrl} liveUrl={liveUrl} name={project.name} />
            </div>
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2
            bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
              Sem foto de preview... ainda em andamento :(
            </span>
            <div
              className="absolute inset-0 bg-slate-950/60
              opacity-0 group-hover:opacity-100 transition-all duration-300
              flex items-center justify-center gap-3"
            >
              <ImageLinks githubUrl={githubUrl} liveUrl={liveUrl} name={project.name} />
            </div>
          </div>
        )}
      </div>

      {/* ── Conteúdo ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Categorias + número + progresso */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.categories?.map((cat) => (
              <CategoryBadge key={cat} label={cat} />
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {project.progress && <ProgressBadge status={project.progress} />}
          </div>
        </div>

        {/* Nome */}
        <h3
          className="text-lg font-bold text-slate-100 leading-snug
          group-hover:text-lime-300 transition-colors duration-300"
        >
          {project.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tools */}
        {project.tools?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tools.slice(0, 5).map((tool) => (
              <TechTag key={tool} label={tool} />
            ))}
            {project.tools.length > 5 && (
              <span className="px-2.5 py-1 text-xs text-slate-500">
                +{project.tools.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links inline no rodapé */}
        {hasLinks && (
          <div className="flex items-center gap-4 pt-2 border-t border-slate-800">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub de ${project.name}`}
                className="flex items-center gap-1.5 text-xs text-slate-500
                  hover:text-lime-400 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                Repositório
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo ao vivo de ${project.name}`}
                className="flex items-center gap-1.5 text-xs text-slate-500
                  hover:text-lime-400 transition-colors duration-200"
              >
                <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                Ver ao vivo
              </a>
            )}
          </div>
        )}
      </div>

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

// ─── Botões sobrepostos na imagem ─────────────────────────────────────────────
function ImageLinks({ githubUrl, liveUrl, name }) {
  return (
    <>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub de ${name}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-slate-800 border border-slate-600 text-slate-200 text-sm font-medium
            hover:border-lime-400/50 hover:text-lime-400 transition-all duration-200"
        >
          <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
          GitHub
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Demo ao vivo de ${name}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-lime-500 text-slate-900 text-sm font-semibold
            hover:bg-lime-400 hover:scale-105 transition-all duration-200"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          Ver ao vivo
        </a>
      )}
    </>
  );
}