"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProgressiveBlurNavbar from "@/components/Navbar";
import { head } from "framer-motion/client";

const ScrambleText = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayChars, setDisplayChars] = useState<
    { char: string; isFixed: boolean }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInitiallyAnimated, setHasInitiallyAnimated] = useState(false);

  const alphabet = "abcdehkmnorsuvwxz";
  const scrambleDuration = 10; // ms per character cycle
  const cyclesPerChar = 15; // number of random chars to show before revealing

  const currentWord = words[currentWordIndex];

  const startAnimation = (isInitial = false) => {
    if (isAnimating) return; // Prevent multiple animations

    // For hover, cycle to next word. For initial load, use current word
    if (!isInitial) {
      const nextIndex = (currentWordIndex + 1) % words.length;
      setCurrentWordIndex(nextIndex);
    }

    const targetWord = isInitial
      ? words[0]
      : words[(currentWordIndex + 1) % words.length];

    setIsAnimating(true);
    setCurrentIndex(0);
    // Initialize with all random characters matching the length of the target word
    const randomChars = targetWord.split("").map(() => ({
      char: alphabet[Math.floor(Math.random() * alphabet.length)],
      isFixed: false,
    }));
    setDisplayChars(randomChars);
  };

  const handleHover = () => startAnimation(false);

  // Initial animation on mount
  useEffect(() => {
    if (!hasInitiallyAnimated) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setCurrentIndex(0);
        setHasInitiallyAnimated(true);
        // Initialize with all random characters for the first word
        const randomChars = words[0].split("").map(() => ({
          char: alphabet[Math.floor(Math.random() * alphabet.length)],
          isFixed: false,
        }));
        setDisplayChars(randomChars);
      }, 0); // 1 second delay after page load

      return () => clearTimeout(timer);
    }
  }, [hasInitiallyAnimated, words, alphabet]);

  useEffect(() => {
    if (!isAnimating || currentIndex >= currentWord.length) {
      if (currentIndex >= currentWord.length) {
        setIsAnimating(false);
        // Ensure final text is correct - all characters fixed
        const finalChars = currentWord.split("").map((char) => ({
          char,
          isFixed: true,
        }));
        setDisplayChars(finalChars);
      }
      return;
    }

    let cycleCount = 0;
    const scrambleInterval = setInterval(() => {
      if (cycleCount < cyclesPerChar) {
        // Build display chars: fixed chars + current scrambling char + random chars for remaining
        const newChars = currentWord.split("").map((char, i) => {
          if (i < currentIndex) {
            // Already revealed characters
            return { char, isFixed: true };
          } else if (i === currentIndex) {
            // Current character being scrambled
            return {
              char: alphabet[Math.floor(Math.random() * alphabet.length)],
              isFixed: false,
            };
          } else {
            // Remaining characters show as random
            return {
              char: alphabet[Math.floor(Math.random() * alphabet.length)],
              isFixed: false,
            };
          }
        });

        setDisplayChars(newChars);
        cycleCount++;
      } else {
        // Reveal the actual character and move to next
        const newChars = currentWord.split("").map((char, i) => {
          if (i <= currentIndex) {
            // Revealed chars including current
            return { char, isFixed: true };
          } else {
            // Add random characters for remaining positions
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
  }, [currentIndex, isAnimating, currentWord]);

  return (
    <span onMouseEnter={handleHover}>
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
      {!isAnimating ? (
        <div className="animate-cursor-blink inline">_</div>
      ) : null}
    </span>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Heading animations
  const headingY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [1, 0.5, 0]
  );
  const headingBlur = useTransform(scrollYProgress, [0, 0.5], [0, 20]);

  // Projects animations
  const projectsY = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, 0]);
  const projectsOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    [0, 0.5, 1]
  );

  // Navbar animation - show when projects are visible
  const navbarOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Progressive Blur Navigation - Hidden until projects appear */}
      <motion.div style={{}}>
        <ProgressiveBlurNavbar />
      </motion.div>

      {/* Hero Section - Slides up and blurs out */}
      <motion.div
        className="min-h-screen flex items-center justify-center sticky top-0 z-10"
        style={{
          y: headingY,
          opacity: headingOpacity,
        }}
      >
        <motion.h1 className="text-7xl font-light text-white font-vogun px-8">
          Hi! I'm Vaibhav
        </motion.h1>
      </motion.div>

      {/* Projects Section - Revealed from underneath */}
      <motion.div
        className="relative z-20 min-h-screen bg-black"
        style={{
          y: projectsY,
          opacity: 1,
        }}
      >
        <div className="flex mx-auto justify-center items-centerj min-w-full">
          {/* Projects Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-vogun text-white mb-12 mt-20">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {/* Project 1 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-lime-300/50 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-lime-300/20 to-emerald-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🎨</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-vogun text-white mb-2">
                    Creative Studio App
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    A collaborative design platform built with React and
                    Three.js featuring real-time 3D rendering and multiplayer
                    editing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      React
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Three.js
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      WebGL
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-lime-300/50 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-purple-400/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🤖</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-vogun text-white mb-2">
                    AI Content Generator
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Machine learning powered tool for generating creative
                    content with natural language processing and image
                    synthesis.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Python
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      TensorFlow
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Next.js
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-lime-300/50 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-cyan-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">📱</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-vogun text-white mb-2">
                    Social Connect Mobile
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Cross-platform mobile app for authentic social connections
                    with location-based features and event planning.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Flutter
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Dart
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      Firebase
                    </span>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-lime-300/50 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-orange-400/20 to-red-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">🎵</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-vogun text-white mb-2">
                    Audio Visualizer Studio
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Real-time audio visualization tool with customizable effects
                    and shader-based rendering for musicians and creators.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      JavaScript
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      WebAudio
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-lime-300/10 text-lime-300 border border-lime-300/20">
                      GLSL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
