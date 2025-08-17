"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollPct, setScrollPct] = useState(0);
  // Function to calculate the scroll percentage
  // Returns a value between 0 and 100
  // 0% means at the top, 100% means at the bottom
  // Uses window.scrollY and document.documentElement.scrollHeight
  // Handles edge cases like no scrolling or very short pages

  const getScrollPercentage = () => {
    if (typeof window === "undefined") return 0;
    const scrollTop = window.scrollY || 0;
    const windowHeight = window.innerHeight || 1;
    const documentHeight = document?.documentElement?.scrollHeight || 1;
    const denom = Math.max(1, documentHeight - windowHeight);
    const pct = (scrollTop / denom) * 100;
    return Math.min(100, Math.max(0, pct));
  };

  useEffect(() => {
    const handleScroll = () => setScrollPct(getScrollPercentage());
    // set initial value on mount
    setScrollPct(getScrollPercentage());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <div>
    //   <div className="min-h-screen flex flex-col items-center justify-center text-white">
    //     <div className="h-screen items-center justify-center">
    //       <h1 className="text-4xl">{"Hello, I'm Vaibhav Kukreti"}</h1>
    //     </div>
    //     {/* show this only when the user has not scrolled */}
    //     <motion.div
    //       className="bottom-4 absolute"
    //       style={{
    //         translateY: -scrollPct * 2,
    //         opacity: 1 - scrollPct / 100,
    //         transitionDuration: "0.2s",
    //       }}
    //     >
    //       Scroll to see what I do
    //     </motion.div>
    //   </div>
    // </div>

    // This is a placeholder for the home page
    <div className=" items-center justify-center h-screen flex">
      Page is under construction
    </div>
  );
}
