
export default function FooterSection() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60">

      {/* Linha decorativa lime no topo — fecha o visual da aurora da seção Contato */}
      <div className="absolute top-0 inset-x-0 h-px
        bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <span className="text-lg font-bold bg-gradient-to-r from-lime-400 to-emerald-400
            bg-clip-text text-transparent">
            Jukka.Dev
          </span>

          {/* Copyright + crédito */}
          <p className="text-xs text-slate-500 text-center order-last sm:order-none leading-relaxed">
            &copy; {new Date().getFullYear()} Todos os direitos reservados | <br className="sm:hidden" />
            Desenvolvido por <a href="https://www.linkedin.com/in/juliana-jacinto/" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline">Juliana Jacinto</a>
          </p>
        </div>
      </div>
    </footer>
  );
}