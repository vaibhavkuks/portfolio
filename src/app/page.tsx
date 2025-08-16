"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 800, 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white relative">
      {/* Main content container */}
      <div className="relative z-10">
        {/* Hero section with centered text */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Hello!
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl font-light mb-8">
              I&apos;m Vaibhav
            </p>
            <div className="animate-bounce mt-16">
              <svg
                className="w-6 h-6 mx-auto text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Portfolio content section */}
        <section
          className="min-h-screen bg-white text-gray-900 transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${Math.max(
              0,
              100 - scrollProgress * 100
            )}vh)`,
            opacity: scrollProgress,
          }}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                My Portfolio
              </h2>

              {/* About section */}
              <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-800">
                  About Me
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  I&apos;m a passionate full-stack developer who loves creating
                  beautiful, functional, and user-friendly web applications.
                  With expertise in modern technologies like React, Next.js, and
                  TypeScript, I bring ideas to life through clean, efficient
                  code.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="bg-gradient-to-r from-purple-100 to-indigo-100 p-3 rounded-lg text-center"
                      >
                        <span className="font-medium text-purple-800">
                          {skill}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Projects section */}
              <div className="mb-16">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-800">
                  Featured Projects
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((project) => (
                    <div
                      key={project}
                      className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="h-40 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg mb-4"></div>
                      <h4 className="text-xl font-semibold mb-2 text-purple-800">
                        Project {project}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        A showcase of modern web development techniques and
                        innovative solutions.
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          Live Demo
                        </button>
                        <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                          GitHub
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact section */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-800">
                  Let&apos;s Connect
                </h3>
                <p className="text-lg text-gray-700 mb-8">
                  Ready to bring your ideas to life? Let&apos;s work together to
                  create something amazing!
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all text-lg font-medium">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 overflow-hidden bg-grey/90 backdrop-blur-md">
        <div className="relative container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/70">
            <div className="mb-1 sm:mb-0">
              © 2025 Vaibhav Kukreti. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <span>Design by Vaibhav</span>
              <span>•</span>
              <a
                href="mailto:your.email@example.com"
                className="hover:text-white transition-colors"
              >
                your.email@example.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
