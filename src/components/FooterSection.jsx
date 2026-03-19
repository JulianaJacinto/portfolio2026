import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBugSlash } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function FooterSection() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60">

      {/* Linha decorativa lime no topo — fecha o visual da aurora da seção Contato */}
      <div className="absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-lime-400 to-emerald-400
            bg-clip-text text-transparent">
            Jukka.Dev
          </span>
          <p className="text-xs text-slate-500 text-center order-last sm:order-none leading-relaxed">
            &copy; {new Date().getFullYear()} Todos os direitos reservados 
          </p>
          </div>

          {/* 404 Error Page */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="/404" className="flex items-center gap-2 hover:text-lime-400 hover:scale-110 transition-all duration-300">
              404 Page
              <FontAwesomeIcon icon={faBugSlash} />
            </a>
          </div>

          <div className="flex gap-4 text-slate-400 text-2xl">
            <a href="https://github.com/julianajacinto" target="_blank">
              <FontAwesomeIcon icon={faGithub} className="hover:text-lime-400 hover:scale-110 transition-all duration-300"/>
            </a>

            <a href="https://linkedin.com/in/juliana-jacinto" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} className="hover:text-lime-400 hover:scale-110 transition-all duration-300"/>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}