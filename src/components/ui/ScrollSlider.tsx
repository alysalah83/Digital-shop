"use client";

import { ICONS_MAP } from "@/consts/iconsMap";
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface CategoriesSliderContextValues {
  position: number;
  sliderContainerRef: React.RefObject<HTMLDivElement | null>;
  elementPerSlide: number;
  sliderOffset: number;
  setElementPerSlide: React.Dispatch<React.SetStateAction<number>>;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  setSliderOffset: React.Dispatch<React.SetStateAction<number>>;
  handleSlideRight: () => void;
  handleSlideLeft: () => void;
}

const ScrollSliderContext = createContext<CategoriesSliderContextValues | null>(
  null,
);

function ScrollSlider({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [elementPerSlide, setElementPerSlide] = useState(4);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (sliderContainerRef.current)
      setPosition(sliderContainerRef.current.scrollLeft);
  }, []);

  const handleSlideRight = useCallback(() => {
    if (!sliderContainerRef.current) return;

    const nextPosition =
      position + sliderContainerRef.current.offsetWidth * 1.1;

    sliderContainerRef.current.scrollTo({
      left: nextPosition,
      behavior: "smooth",
    });
  }, [position]);

  const handleSlideLeft = useCallback(() => {
    if (!sliderContainerRef.current) return;

    const prevPosition = Math.max(
      0,
      position - sliderContainerRef.current.offsetWidth * 1.1,
    );

    sliderContainerRef.current.scrollTo({
      left: prevPosition,
      behavior: "smooth",
    });
  }, [position]);

  useEffect(function () {
    let resizeTimer: undefined | NodeJS.Timeout;
    const updateDimensions = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1000) setElementPerSlide(4);
      else setElementPerSlide(2);

      if (sliderContainerRef.current)
        setSliderOffset(sliderContainerRef.current.offsetWidth);
    };
    updateDimensions();

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sliderContainerRef.current)
      setSliderOffset(sliderContainerRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    const element = sliderContainerRef.current;
    element?.addEventListener("scroll", handleScroll);

    return () => element?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const values = useMemo(
    () => ({
      position,
      setPosition,
      sliderContainerRef,
      elementPerSlide,
      setElementPerSlide,
      sliderOffset,
      setSliderOffset,
      handleSlideRight,
      handleSlideLeft,
    }),
    [
      position,
      sliderContainerRef,
      elementPerSlide,
      sliderOffset,
      handleSlideRight,
      handleSlideLeft,
    ],
  );

  return <ScrollSliderContext value={values}>{children}</ScrollSliderContext>;
}

function ScrollSliderContent({
  children,
  gap = "gap-6",
}: {
  children: React.ReactNode;
  gap?: `gap-${number}`;
}) {
  const { sliderContainerRef } = useScrollSlider();

  return (
    <div
      className={`scrollbar-hide flex ${gap} overflow-scroll`}
      ref={sliderContainerRef}
    >
      {children}
    </div>
  );
}

function ScrollSliderButtons() {
  const { handleSlideLeft, handleSlideRight } = useScrollSlider();

  return (
    <>
      <button
        className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
        onClick={handleSlideLeft}
        type="button"
        aria-label="scroll left button"
      >
        <ICONS_MAP.arrowLeft className="h-5 w-5 fill-slate-900" />
      </button>
      <button
        className="h-fit cursor-pointer rounded-md border border-slate-300 bg-white px-2 py-2 transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200"
        onClick={handleSlideRight}
        type="button"
        aria-label="scroll right button"
      >
        <ICONS_MAP.arrowRight className="h-5 w-5 fill-slate-900" />
      </button>
    </>
  );
}

const useScrollSlider = function () {
  const values = use(ScrollSliderContext);
  if (!values) throw new Error("the context is being used out of its scope");
  return values;
};

export {
  useScrollSlider,
  ScrollSliderContent,
  ScrollSliderButtons,
  ScrollSlider,
};
