import { useState, useCallback, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const ICON_VARIANTS = [faSolidHeart, faHeartRegular];

const globalStyles = `
  @keyframes floatReaction {
  0%   { transform: translate(0, 0) scale(0.8); opacity: 1; }
  30%  { transform: translate(var(--x), -60px) scale(1.1); }
  60%  { transform: translate(calc(var(--x) * 1.3), -140px) scale(1); }
  100% { transform: translate(calc(var(--x) * 1.6), -220px) scale(0.6); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.18); }
}

.like-btn {
  cursor: pointer;
  border: 2px solid #1d293d; 
  background: #7ccf00;
  border-radius: 999px;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  color: #1d293d;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.1s;
}

.like-btn:hover {
  background: #bbf451;
  border-color: #314158;
  box-shadow: 0 4px 16px rgba(124, 207, 0, 0.4);
}

.like-btn:active {
  transform: scale(0.94);
  background: #6ab800;
}

.like-btn:focus-visible {
  outline: 2px solid #1d293d;
  outline-offset: 3px;
}

.like-btn.liked .heart-icon {
  animation: pulse 0.4s ease;
}
`;

function FloatingHeart({ x, size, drift, icon, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400 + 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      onAnimationEnd={onDone}
      style={{
        position: "fixed",
        left: x,
        bottom: "90px",
        fontSize: `${size}px`,   
        "--x": `${drift}px`,          
        pointerEvents: "none",
        zIndex: 9999,
        animation: "floatReaction 2.4s ease-out forwards",
        willChange: "transform, opacity",
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

export default function LikeButton() {
  const [hearts, setHearts] = useState([]);
  const [liked, setLiked] = useState(false);
  const idRef = useRef(0);

  const spawnHearts = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    const newHeart = {
      id: idRef.current++,
      x: centerX,
      icon: ICON_VARIANTS[Math.floor(Math.random() * ICON_VARIANTS.length)],
      size: Math.random() * 8 + 18,
      drift: Math.random() * 120 - 60,
    };

    setHearts((prev) => [...prev, newHeart]);
    setLiked(true);
  }, []);

  const removeHeart = useCallback((id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ position: "fixed", bottom: 32, left: 32, zIndex: 9998 }}>
        <button
          className={`like-btn${liked ? " liked" : ""}`}
          onClick={spawnHearts}
        >
          <span className="heart-icon" style={{ fontSize: 22 }}>
            <FontAwesomeIcon icon={liked ? faSolidHeart : faHeartRegular} />
          </span>
        </button>
      </div>

      {hearts.map((h) => (
        <FloatingHeart
          key={h.id}
          {...h}
          onDone={() => removeHeart(h.id)}
        />
      ))}
    </>
  );
}