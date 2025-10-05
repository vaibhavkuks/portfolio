"use client";

import { useEffect, useState } from "react";

const ScrambleText = ({ text }: { text: string }) => {
  const [displayChars, setDisplayChars] = useState<
    { char: string; isFixed: boolean }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const alphabet = "abcdehkmnorsuvwxz";
  const scrambleDuration = 8;
  const cyclesPerChar = 10;

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(0);
    const randomChars = text.split("").map(() => ({
      char: alphabet[Math.floor(Math.random() * alphabet.length)],
      isFixed: false,
    }));
    setDisplayChars(randomChars);
  };

  useEffect(() => {
    if (!isAnimating) {
      const finalChars = text.split("").map((char) => ({
        char,
        isFixed: true,
      }));
      setDisplayChars(finalChars);
      return;
    }

    if (currentIndex >= text.length) {
      setIsAnimating(false);
      const finalChars = text.split("").map((char) => ({
        char,
        isFixed: true,
      }));
      setDisplayChars(finalChars);
      return;
    }

    let cycleCount = 0;
    const scrambleInterval = setInterval(() => {
      if (cycleCount < cyclesPerChar) {
        const newChars = text.split("").map((char, i) => {
          if (i < currentIndex) {
            return { char, isFixed: true };
          } else if (i === currentIndex) {
            return {
              char: alphabet[Math.floor(Math.random() * alphabet.length)],
              isFixed: false,
            };
          } else {
            return {
              char: alphabet[Math.floor(Math.random() * alphabet.length)],
              isFixed: false,
            };
          }
        });

        setDisplayChars(newChars);
        cycleCount++;
      } else {
        const newChars = text.split("").map((char, i) => {
          if (i <= currentIndex) {
            return { char, isFixed: true };
          } else {
            return {
              char: alphabet[Math.floor(Math.random() * alphabet.length)],
              isFixed: false,
            };
          }
        });

        setDisplayChars(newChars);
        clearInterval(scrambleInterval);
        setCurrentIndex((prev) => prev + 1);
      }
    }, scrambleDuration);

    return () => clearInterval(scrambleInterval);
  }, [currentIndex, isAnimating, text]);

  return (
    <span onMouseEnter={startAnimation} className="inline-block">
      {displayChars.map((charObj, index) => (
        <span
          key={index}
          className={
            (charObj.isFixed ? "opacity-100" : "opacity-60") +
            " transition-opacity"
          }
        >
          {charObj.char}
        </span>
      ))}
    </span>
  );
};

const ProgressiveBlurFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show footer after scrolling 100vh (past the intro section)
      setIsVisible(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-10 pointer-events-none z-40 transition-transform duration-450 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        transform: isVisible
          ? "translateZ(0) translateY(0)"
          : "translateZ(0) translateY(100%)",
        WebkitTransform: isVisible
          ? "translateZ(0) translateY(0)"
          : "translateZ(0) translateY(100%)",
      }}
    >
      {/* Solid black background with top border */}
      <div className="absolute inset-0 bg-black border-t border-white/20"></div>

      {/* Footer content */}
      <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-between px-8 pointer-events-auto">
        <div className="text-white/50 text-sm">© 2025 Vaibhav Kukreti</div>

        <div className="flex gap-6 text-sm">
          <a
            href="https://instagram.com/vaibhavcooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-lime-300 transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/in/vaibhavkukreti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-lime-300 transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/vaibhavcooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-lime-300 transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="mailto:vaibhav@example.com"
            className="text-white/70 hover:text-lime-300 transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveBlurFooter;
