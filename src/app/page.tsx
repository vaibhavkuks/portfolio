"use client";

import { useEffect, useState } from "react";
import ProgressiveBlurNavbar from "@/components/Navbar";
import ProgressiveBlurFooter from "@/components/Footer";

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
  const synonyms = [
    "code",
    "create",
    "build",
    "engineer",
    "design",
    "develop",
    "construct",
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden relative">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Progressive Blur Navigation */}
      <ProgressiveBlurNavbar />

      {/* create a background blacking radial gradient to highlight the text */}

      <div className="flex flex-col items-left text-left px-8 relative z-10">
        <h1 className="text-7xl font-light mb-4 text-white font-vogun mt-40">
          {"I'm Vaibhav Kukreti"}
        </h1>
        {/* <div className="flex flex-row items-center text-white/80 text-3xl font-vogun">
          <span className="">I like to </span>
          <span className="ml-2 text-lime-300 flex flex-row">
            <ScrambleText words={synonyms} />
          </span>
        </div> */}
        {/* Add my interests in a wrapped row of multiple chips with labels */}
        <div className="text-white/70 text-lg mt-4 max-w-2xl">
          <span>
            I like to create things that are alive, be it through code, art,
            photography or music. I love exploring the intersection of
            technology and creativity, and am passionate about building
            delightful user experiences.
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 max-w-lg">
          {[
            "Flutter",
            "Dart",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "UI/UX",
            "AI/ML",
            "Deep Learning",
            "Graphic Design",
            "Blender 3D",
            "3D Modeling",
            "3D Animation",
            "Photography",
            "Music",
            "Philosophy",
            "Psychology",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70 bg-white/5 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mt-32 mb-20">
          <h2 className="text-4xl font-vogun text-white mb-12">
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
                  A collaborative design platform built with React and Three.js
                  featuring real-time 3D rendering and multiplayer editing.
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
                  Machine learning powered tool for generating creative content
                  with natural language processing and image synthesis.
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

      {/* Progressive Blur Footer */}
      <ProgressiveBlurFooter />
    </div>
  );
}
