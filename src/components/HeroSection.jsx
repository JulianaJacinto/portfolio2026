import { useEffect, useState} from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram, faReact, faCss3, faJs, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// Custom hook for typing animation
function useTypewriter(text, speed = 20) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return { displayedText, isComplete };
}

// Reusable Button Component
function HeroButton({ href, variant = "primary", children }) {
  const baseStyles = "rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-lime-500 px-6 md:px-7 py-2.5 md:py-3 text-slate-900 hover:bg-lime-400 hover:shadow-lg hover:shadow-lime-400/50 hover:scale-105",
    secondary: "bg-slate-900 border border-lime-500 px-6 md:px-7 py-2.5 md:py-3 text-lime-400 hover:bg-lime-500/10 hover:border-lime-400 hover:text-lime-300 hover:scale-105"
  };

  return (
    <a href={href} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </a>
  );
}

// Floating Social Icon Component
function FloatingIcon({ icon, position, delay }) {
  return (
    <div
      className={`absolute w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-800/60 border border-lime-400/30 backdrop-blur-sm hover:bg-slate-700/80 hover:border-lime-400/60 transition-all duration-300 ${position}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {icon}
    </div>
  );
}

// Profile Visual Component - Responsivo
function ProfileVisual() {
  return (
    <div className="relative w-full flex justify-center items-center mt-12 md:mt-0 md:h-96">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Animated gradient blob background */}
      <div className="absolute w-60 h-60 md:w-80 md:h-80 bg-gradient-to-br from-lime-500/20 via-amber-400/20 to-lime-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating icons - Hidden on mobile */}
      <div className="hidden lg:block">
        <FloatingIcon 
          icon={<FontAwesomeIcon icon={faReact} className="w-6 h-6 md:w-8 md:h-8 text-lime-400" />}
          position="top-0 left-8"
          delay="0"
        />
        <FloatingIcon 
          icon={<FontAwesomeIcon icon={faJs} className="w-6 h-6 md:w-8 md:h-8 text-lime-400" />}
          position="top-8 right-0"
          delay="0.5"
        />
        <FloatingIcon 
          icon={<FontAwesomeIcon icon={faCss3} className="w-6 h-6 md:w-8 md:h-8 text-lime-400" />}
          position="bottom-8 left-4"
          delay="1"
        />
      </div>

      {/* Profile circle with optimized image handling */}
      <div className="w-72 h-72 md:w-72 md:h-72 relative z-10 rounded-full overflow-hidden shadow-2xl" style={{ animation: "fadeInScale 0.8s ease-out" }}>
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-full border-2 border-lime-500/40 pointer-events-none z-20"></div>
        
        {/* Background gradient fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        
        {/* Image container */}
        <img 
          src="sua-foto.jpg" 
          alt="Juliana Jacinto" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Fallback placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs md:text-sm">
          <div className="text-center">
            <p className="text-lime-400 mb-2">📸</p>
            <p>foto de perfil</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const fullText = "Desenvolvedora Web | Front-End | React & Tailwind";
  const { displayedText, isComplete } = useTypewriter(fullText, 20);

  return (
    <>
      <section className="relative min-h-screen md:min-h-[720px] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-lime-800 px-6 sm:px-6 py-16 md:py-16 overflow-hidden pt-20 md:pt-32" id="home">
        
        {/* Decorative dot pattern background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mt-24 md:mt-24">
          
          {/* Text Content */}
          <div className="space-y-4 md:space-y-6 animate-fadeIn">
            {/* Name */}
            <div>
              <h1 className="text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent block">
                  Juliana Jacinto
                </span>
              </h1>
            </div>

            {/* Animated subtitle */}
            <div className="min-h-[2rem] md:min-h-[2.5rem]">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 font-semibold line-clamp-2">
                {displayedText}
                <span className={`ml-1 ${isComplete ? "animate-pulse" : "animate-bounce"} text-lime-400 inline-block`}>
                  |
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-base md:text-base text-slate-400 max-w-lg leading-relaxed">
              Combinando criatividade e lógica para desenvolver interfaces modernas, funcionais e alinhadas com objetivos reais de negócio.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <HeroButton href="#projetos" variant="primary">
                Ver Projetos
              </HeroButton>

              <HeroButton href="#contato" variant="secondary">
                Contate-me
                <PhoneIcon className="w-4 h-4" />
              </HeroButton>
            </div>

            {/* Social Links - Icon Only */}
            <div className="pt-4 md:pt-6 border-t border-lime-700">
              <div className="flex gap-4 md:gap-6">
                <a
                  href="https://github.com/julianajacinto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-lime-300 hover:scale-125 transition-all duration-300 p-2 hover:bg-slate-800/30 rounded-lg"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/juliana-jacinto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-lime-300 hover:scale-125 transition-all duration-300 p-2 hover:bg-slate-800/30 rounded-lg"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a 
                  href="https://wa.me/55991999999" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-200 hover:text-lime-300 hover:scale-125 transition-all duration-300 p-2 hover:bg-slate-800/30 rounded-lg"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a 
                  href="https://www.instagram.com/jukka.arts/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-200 hover:text-lime-300 hover:scale-125 transition-all duration-300 p-2 hover:bg-slate-800/30 rounded-lg"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <ProfileVisual />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <ChevronDownIcon className="w-8 h-8 text-lime-400 mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
}