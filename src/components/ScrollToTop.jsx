import { useEffect, useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

// Altura em px a partir da qual o botão aparece
const SHOW_AFTER = 50;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-6 z-50
        w-14 h-14 rounded-full
        -rotate-45
        bg-slate-800 border border-lime-400/50 text-lime-400
        hover:bg-lime-500 hover:border-lime-500 hover:text-slate-900
        hover:scale-110 hover:-translate-y-1
        shadow-lg shadow-black/30 hover:shadow-lime-500/20
        backdrop-blur-sm
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <RocketLaunchIcon className="w-6 h-6 mx-auto" />
    </button>
  );
}