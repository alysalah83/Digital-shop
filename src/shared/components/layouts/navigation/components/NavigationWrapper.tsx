"use client";

import { useEffect, useState, ReactNode, useLayoutEffect, useRef } from "react";
import { NAVIGATION_SHRINK_THRESHOLD } from "../consts/navigation.consts";

interface NavigationWrapperProps {
  children: ReactNode;
}

function NavigationWrapper({ children }: NavigationWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHight, setNavHight] = useState(218);
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!navRef.current) return;

    let id: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(id);
      const navHight = entry.contentRect.height;
      id = setTimeout(() => setNavHight(navHight), 500);
    });

    observer.observe(navRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const options = {
      threshold: NAVIGATION_SHRINK_THRESHOLD,
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    }, options);

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        height: `${navHight + 40}px`,
      }}
      className="bg-slate-200"
      ref={sentinelRef}
    >
      <nav
        className={`fixed top-0 right-0 left-0 z-[999] grid bg-white/90 px-2 backdrop-blur-sm transition-all duration-300 sm:px-4 md:px-7 lg:grid-cols-3 ${
          isScrolled
            ? "grid-rows-[auto_auto] gap-y-2 py-2 shadow-md md:py-2"
            : "grid-rows-[auto_auto_auto] gap-y-4 py-5 md:py-5 md:pb-0 lg:grid-rows-2 lg:gap-y-10"
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
