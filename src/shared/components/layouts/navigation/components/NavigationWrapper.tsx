"use client";

import { useEffect, useState, ReactNode, useLayoutEffect, useRef } from "react";
import { NAVIGATION_SHRINK_THRESHOLD } from "../consts/navigation.consts";

interface NavigationWrapperProps {
  children: ReactNode;
}

function NavigationWrapper({ children }: NavigationWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(72);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    let id: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(id);
      const h = entry.contentRect.height;
      id = setTimeout(() => setNavHeight(h), 100);
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: NAVIGATION_SHRINK_THRESHOLD },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ height: `${navHeight + 32}px` }}
      className="bg-slate-200"
      ref={sentinelRef}
    >
      <nav
        className={`fixed top-0 right-0 left-0 z-[999] overflow-visible bg-white/95 px-4 backdrop-blur-md transition-all duration-300 sm:px-5 md:px-8 ${
          isScrolled ? "py-2 shadow-lg shadow-black/5" : "py-3 md:py-4"
        }`}
        data-scrolled={isScrolled}
        ref={navRef}
      >
        {children}
      </nav>
    </div>
  );
}

export default NavigationWrapper;
