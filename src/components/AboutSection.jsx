

export default function AboutSection() {
  return (
    <section className="bg-gradient-to-b from-lime-800 via-lime-600 to-lime-500 text-slate-200 py-28 px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* About Me */}
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-lime-100">Sobre Mim</h2>
            <p>Conheça um pouco mais sobre mim e da minha trajetória profissional!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden shadow-lg animate-fadeIn">
            <img src="/profile.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 animate-fadeIn">
            <p className="text-base sm:text-base md:text-lg text-slate-300 max-w-lg leading-relaxed">
                Olá! Sou a Juliana Jacinto, ou Jukka para os intimos, uma desenvolvedora front-end apaixonada por criar experiências digitais envolventes e funcionais.
                <br />
                Atualmente, estou cursando para graduação Análise e Desenvolvimento de Sistemas na FATEC de Cruzeiro-SP. Sou bolsista no Instituto Nacional de Pesquisas Espaciais (INPE), 
                participando do Projeto Educação em parceria com universidades e instituições, contribuindo em iniciativas de inovação tecnológica. 
                Sou apaixonada por tecnologia e artes visuais, sempre buscando novos métodos de ensino para poder aprimorar meus conhecimentos nessas duas áreas, 
                que acabou se misturando ao longo dos anos. Tenho 8 anos de experiência com programação em geral, 
                mas tive o maior foco em HTML, CSS, JavaScript e atualmente estou estudando frameworks como React e Next.js em busca de aprender 
                novas tecnologias para aprimorar minhas habilidades.
                <br />
                Trabalho com códigos limpos, projetos organizados e tenho o foco em experiência do usuário (UX/UI) e estruturas funcionais e responsivas para garantir projetos visuais 
                impactantes e de alta performance.
            </p>
            <div>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white rounded-lg shadow-md transition-colors duration-300">
                    Baixar CV
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}